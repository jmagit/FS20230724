/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ViewModelService } from '../base-code/view-model-service.class';
import { ActoresDAOService } from '../common-services/daos.service';
import { LoggerService } from 'jma-core';
import { NotificationService, NavigationService } from '../common-services';
import { AuthService } from '../security';


@Injectable({
  providedIn: 'root'
})
export class ActoresViewModelService extends ViewModelService<any, number> {
  constructor(dao: ActoresDAOService, notify: NotificationService, out: LoggerService,
    auth: AuthService, router: Router, navigation: NavigationService) {
    super(dao, {}, notify, out, auth, router, navigation)
  }
  page = 0;
  totalPages = 0;
  totalRows = 0;
  rowsPerPage = 10;
  load(page: number = -1) {
    if (!page || page < 0) page = this.page;
    (this.dao as ActoresDAOService).page(page, this.rowsPerPage).subscribe({
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

  peliculas: Array<any> = []

  public override view(key: number): void {
    super.view(key);
    (this.dao as ActoresDAOService).peliculas(key).subscribe({
      next: data => {
        this.peliculas = data.map(item => ({filmId: item.key, title: item.value }));
      },
      error: err => this.handleError(err)
    });
  }
}

@Component({
  selector: 'app-actores-list',
  templateUrl: './tmpl-list.component.html',
  styleUrls: ['./componente.component.css']
})
export class ActoresListComponent implements OnChanges, OnDestroy {
  @Input() page = 0
  constructor(protected vm: ActoresViewModelService) { }

  public get VM(): ActoresViewModelService { return this.vm; }

  ngOnChanges(changes: SimpleChanges): void {
    this.vm.load(this.page)
  }

  ngOnDestroy(): void { this.vm.clear(); }
}

@Component({
  selector: 'app-actores-add',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.css']
})
export class ActoresAddComponent implements OnInit {
  constructor(protected vm: ActoresViewModelService) { }
  public get VM(): ActoresViewModelService { return this.vm; }
  ngOnInit(): void {
    this.vm.add();
  }
}

@Component({
  selector: 'app-actores-edit',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.css']
})
export class ActoresEditComponent implements OnChanges {
  @Input() id?: string;
  constructor(protected vm: ActoresViewModelService, protected router: Router) { }
  public get VM(): ActoresViewModelService { return this.vm; }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.id) {
      this.vm.edit(+this.id);
    } else {
      this.router.navigate(['/404.html']);
    }
  }
}

@Component({
  selector: 'app-actores-view',
  templateUrl: './tmpl-view.component.html',
  styleUrls: ['./componente.component.css']
})
export class ActoresViewComponent implements OnChanges {
  @Input() id?: string;
  constructor(protected vm: ActoresViewModelService, protected router: Router) { }
  public get VM(): ActoresViewModelService { return this.vm; }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.id) {
      this.vm.view(+this.id);
    } else {
      this.router.navigate(['/404.html']);
    }
  }
}


export const ACTORES_COMPONENTES = [ActoresListComponent, ActoresAddComponent, ActoresEditComponent, ActoresViewComponent,];
