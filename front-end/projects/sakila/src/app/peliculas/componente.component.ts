/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, RouterModule, RouterLink } from '@angular/router';
import { PeliculasViewModelService } from './servicios.service';
import { CommonModule } from '@angular/common';
import { NormalizePipe } from 'jma-core';

@Component({
  selector: 'app-peliculas',
  templateUrl: './tmpl-anfitrion.component.html',
  styleUrls: ['./componente.component.css']
})
export class PeliculasComponent implements OnInit, OnDestroy {
  constructor(protected vm: PeliculasViewModelService, private route: ActivatedRoute) { }
  public get VM(): PeliculasViewModelService { return this.vm; }
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      if (this.route.snapshot.url.slice(-1)[0]?.path === 'edit') {
        this.vm.edit(+id);
      } else {
        this.vm.view(+id);
      }
    } else if (this.route.snapshot.url.slice(-1)[0]?.path === 'add') {
      this.vm.add();
    } else {
      this.vm.load(this.route.snapshot.queryParams['page'] ?? 0);
    }
  }
  ngOnDestroy(): void { this.vm.clear(); }
}

@Component({
  selector: 'app-peliculas-list',
  templateUrl: './tmpl-list.component.html',
  styleUrls: ['./componente.component.css']
})
export class PeliculasListComponent implements OnChanges, OnDestroy {
  @Input() page = 0
  @Input() search = ''
  @Input() categoria? : number
  pagina = false
  constructor(protected vm: PeliculasViewModelService) { }

  public get VM(): PeliculasViewModelService { return this.vm; }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.type == 'categorias') {
    //   this.vm.list()
    if (this.categoria) {
      this.vm.porCategorias(this.categoria)
    } else if (this.search == 'categorias') {
      this.vm.cargaCategorias()
    } else{
      this.pagina = true;
      this.vm.load(this.page)
    }
  }

  ngOnDestroy(): void { this.vm.clear(); }
}
@Component({
  selector: 'app-peliculas-list-body',
  templateUrl: './tmpl-list-body.component.html',
  styleUrls: ['./componente.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, NormalizePipe]
})
export class PeliculasListBodyComponent {
  @Input({required: true}) Listado: Array<any> = []
  @Input() urlBase = ''
  @Output() imageError = new EventEmitter<any>()

  imageErrorHandler(event: Event) {
    this.imageError.emit(event)
  }
}

@Component({
  selector: 'app-peliculas-add',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.css']
})
export class PeliculasAddComponent implements OnInit {
  constructor(protected vm: PeliculasViewModelService) { }
  public get VM(): PeliculasViewModelService { return this.vm; }
  ngOnInit(): void {
    this.vm.add();
  }
}

@Component({
  selector: 'app-peliculas-edit',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.css']
})
export class PeliculasEditComponent implements OnChanges {
  @Input() id?: string;
  constructor(protected vm: PeliculasViewModelService, protected router: Router) { }
  public get VM(): PeliculasViewModelService { return this.vm; }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.id) {
      this.vm.edit(+this.id);
    } else {
      this.router.navigate(['/404.html']);
    }
  }
}

@Component({
  selector: 'app-peliculas-view',
  templateUrl: './tmpl-view.component.html',
  styleUrls: ['./componente.component.css']
})
export class PeliculasViewComponent implements OnChanges {
  @Input() id?: string;
  constructor(protected vm: PeliculasViewModelService, protected router: Router) { }
  public get VM(): PeliculasViewModelService { return this.vm; }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.id) {
      this.vm.view(+this.id);
    } else {
      this.router.navigate(['/404.html']);
    }
  }
}

export const PELICULAS_COMPONENTES = [
  PeliculasComponent, PeliculasListComponent, PeliculasAddComponent,
  PeliculasEditComponent, PeliculasViewComponent,
];
