import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JmaCoreModule } from 'jma-core';
import { CommonServicesModule } from '../common-services';
import { ACTORES_COMPONENTES, ActoresAddComponent, ActoresEditComponent, ActoresListComponent, ActoresViewComponent } from './componente.component';
import {PaginatorModule} from 'primeng/paginator';
import { CommonComponentModule } from '../common-component';
import { PeliculasListBodyComponent } from '../peliculas';

export const routes: Routes = [
  { path: '', component: ActoresListComponent },
  { path: 'add', component: ActoresAddComponent },
  { path: ':id/edit', component: ActoresEditComponent },
  { path: ':id', component: ActoresViewComponent },
  { path: ':id/:kk', component: ActoresViewComponent },
];

@NgModule({
  declarations: [
    ACTORES_COMPONENTES,
  ],
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule, FormsModule, RouterModule.forChild(routes),
    JmaCoreModule, CommonServicesModule,
    PaginatorModule, CommonComponentModule, JmaCoreModule, PeliculasListBodyComponent,
  ]
})
export default class ActoresModule { }
