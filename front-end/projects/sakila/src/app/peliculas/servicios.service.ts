import { HttpContext, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from 'jma-core';
import { Observable } from 'rxjs';
import { RESTDAOService, ModoCRUD } from '../base-code';
import { NavigationService, NotificationService } from '../common-services';
import { AuthService, AUTH_REQUIRED } from '../security';
import { ActoresDAOService, CategoriasDAOService, IdiomasDAOService, PeliculasDAOService } from '../common-services/daos.service';

@Injectable({
  providedIn: 'root'
})
export class PeliculasViewModelService {
  protected modo: ModoCRUD = 'list';
  protected listado: Array<any> = [];
  protected elemento: any = {};
  protected idOriginal: any = null;
  protected listURL = '/catalogo';

  constructor(protected notify: NotificationService,
    protected out: LoggerService,
    protected dao: PeliculasDAOService, protected daoIdiomas: IdiomasDAOService, protected daoCategorias: CategoriasDAOService, protected daoActores: ActoresDAOService
    , public auth: AuthService, protected router: Router, private navigation: NavigationService
  ) { }

  public get Modo(): ModoCRUD { return this.modo; }
  public get Listado(): Array<any> { return this.listado; }
  public get Elemento(): any { return this.elemento; }

  public list(): void {
    this.dao.query().subscribe({
      next: data => {
        this.listado = data;
        this.modo = 'list';
      },
      error: err => this.handleError(err)
    });
  }
  public add(): void {
    this.cargaListas()
    this.elemento = {};
    this.modo = 'add';
  }
  public edit(key: any): void {
    this.cargaListas()
    this.dao.get(key).subscribe({
      next: data => {
        this.elemento = data;
        this.idOriginal = key;
        this.modo = 'edit';
      },
      error: err => this.handleError(err)
    });
  }
  public view(key: any): void {
    this.dao.details(key).subscribe({
      next: data => {
        this.elemento = data;
        this.modo = 'view';
      },
      error: err => this.handleError(err)
    });
  }
  public delete(key: any): void {
    if (!window.confirm('¿Seguro?')) { return; }

    this.dao.remove(key).subscribe({
      next: data => {
        // this.list()
        this.cancel()
      },
      error: err => this.handleError(err)
    });
  }

  clear() {
    this.elemento = {};
    this.idOriginal = null;
    this.listado = [];
  }

  public cancel(): void {
    this.elemento = {};
    this.idOriginal = null;
    // this.list();
    // this.load(this.page)
    // this.router.navigateByUrl(this.listURL);
    this.navigation.back()
  }
  public send(): void {
    switch (this.modo) {
      case 'add':
        this.dao.add(this.elemento).subscribe({
          next: data => this.cancel(),
          error: err => this.handleError(err)
        });
        break;
      case 'edit':
        this.dao.change(this.idOriginal, this.elemento).subscribe({
          next: data => this.cancel(),
          error: err => this.handleError(err)
        });
        break;
      case 'view':
        this.cancel();
        break;
    }
  }

  handleError(err: HttpErrorResponse) {
    let msg = ''
    switch (err.status) {
      case 0: msg = err.message; break;
      case 404: msg = `ERROR: ${err.status} ${err.statusText}`; break;
      default:
        msg = `ERROR: ${err.status} ${err.statusText}.${err.error?.['title'] ? ` Detalles: ${err.error['title']}` : ''}`
        break;
    }
    this.notify.add(msg)
  }

  // Paginado

  page = 0;
  totalPages = 0;
  totalRows = 0;
  rowsPerPage = 24;
  load(page: number = -1) {
    if (!page || page < 0) page = this.page
    this.dao.page(page, this.rowsPerPage).subscribe({
      next: rslt => {
        this.page = rslt.page;
        this.totalPages = rslt.pages;
        this.totalRows = rslt.rows;
        this.listado = rslt.list;
        this.modo = 'list';
      },
      error: err => this.handleError(err)
    })
  }
  pageChange(page: number = 0) {
    this.router.navigate([], { queryParams: { page } })
  }
  imageErrorHandler(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/photo-not-found.svg'
  }

  public idiomas: Array<any> = [];
  public clasificaciones: Array<any> = [];
  private actores: Array<any> = [];
  private categorias: Array<any> = [];

  public get Actores(): any { return this.actores.filter(item => !this.elemento?.actors?.includes(item.actorId)); }
  public get Categorias(): any { return this.categorias.filter(item => !this.elemento?.categories?.includes(item.id)); }

  public cargaCategorias() {
    this.daoCategorias.query().subscribe({
      next: data => {
        this.categorias = data;
      },
      error: err => this.handleError(err)
    });
  }

  private cargaListas() {
    if (this.clasificaciones.length === 0)
      this.dao.clasificaciones().subscribe({
        next: data => {
          this.clasificaciones = data;
        },
        error: err => this.handleError(err)
      });
    this.cargaCategorias();
    this.daoActores.query().subscribe({
      next: data => {
        this.actores = data;
      },
      error: err => this.handleError(err)
    });
    this.daoIdiomas.query().subscribe({
      next: data => {
        this.idiomas = data;
      },
      error: err => this.handleError(err)
    });
  }


  dameActor(id: number) {
    if (!this?.actores || this.actores.length === 0) return '(sin cargar)'
    const cat = this.actores.find(item => item.actorId === id)
    return cat ? cat.nombre : 'error'
  }
  addActor(id: number) {
    if(!this.elemento.actors) {
      this.elemento.actors = []
    } else if (this.elemento.actors.includes(id)) {
      this.notify.add('Ya tiene la categoría')
      return
    }
    this.elemento.actors.push(id)
  }
  removeActor(index: number) {
    this.elemento.actors.splice(index, 1)
  }

  dameCategoria(id: number) {
    if (!this?.categorias || this.categorias.length === 0) return '(sin cargar)'
    const cat = this.categorias.find(item => item.id === id)
    return cat ? cat.categoria : 'error'
  }
  addCategoria(id: number) {
    if(!this.elemento.categories) {
      this.elemento.categories = []
    } else if (this.elemento.categories.includes(id)) {
      this.notify.add('Ya tiene la categoría')
      return
    }
    this.elemento.categories.push(id)
  }
  removeCategoria(index: number) {
    this.elemento.categories.splice(index, 1)
  }

  public porCategorias(id: number) {
    this.cargaCategorias();
    this.daoCategorias.peliculas(id).subscribe({
      next: data => {
        this.listado = data;
      },
      error: err => this.handleError(err)
    });
  }
}
