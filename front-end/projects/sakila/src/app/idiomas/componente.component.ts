/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ViewModelService } from '../base-code/view-model-service.class';
import { IdiomasDAOService } from '../common-services/daos.service';
import { LoggerService } from 'jma-core';
import { NotificationService, NavigationService } from '../common-services';
import { AuthService } from '../security';


@Injectable({
  providedIn: 'root'
})
export class IdiomasViewModelService extends ViewModelService<any, number> {
  constructor(dao: IdiomasDAOService, notify: NotificationService, out: LoggerService,
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
  selector: 'app-idiomas',
  templateUrl: './tmpl-anfitrion.component.html',
  styleUrls: ['./componente.component.css']
})
export class IdiomasComponent implements OnInit {
  constructor(protected vm: IdiomasViewModelService) { }
  public get VM(): IdiomasViewModelService { return this.vm; }
  ngOnInit(): void {
    this.vm.list();
  }
}

export const IDIOMAS_COMPONENTES = [ IdiomasComponent, ];
