/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ViewModelService } from '../base-code/view-model-service.class';
import { CategoriasDAOService } from '../common-services/daos.service';
import { LoggerService } from 'jma-core';
import { NotificationService, NavigationService } from '../common-services';
import { AuthService } from '../security';


@Injectable({
  providedIn: 'root'
})
export class CategoriasViewModelService extends ViewModelService<any, number> {
  constructor(dao: CategoriasDAOService, notify: NotificationService, out: LoggerService,
    auth: AuthService, router: Router, navigation: NavigationService) {
    super(dao, {}, notify, out, auth, router, navigation)
  }
  public override cancel(): void {
      this.clear()
      this.notify.clear()
      this.list()
  }
}

@Component({
  selector: 'app-categorias',
  templateUrl: './tmpl-anfitrion.component.html',
  styleUrls: ['./componente.component.css']
})
export class CategoriasComponent implements OnInit {
  constructor(protected vm: CategoriasViewModelService) { }
  public get VM(): CategoriasViewModelService { return this.vm; }
  ngOnInit(): void {
    this.vm.list();
  }
}

export const CATEGORIAS_COMPONENTES = [ CategoriasComponent, ];
