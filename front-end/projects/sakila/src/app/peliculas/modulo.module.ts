import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JmaCoreModule } from 'jma-core';
import { CommonServicesModule } from '../common-services';
import { PeliculasComponent, PELICULAS_COMPONENTES, PeliculasAddComponent, PeliculasEditComponent, PeliculasViewComponent, PeliculasListComponent } from './componente.component';
import {PaginatorModule} from 'primeng/paginator';
import { CommonComponentModule } from '../common-component';

export const routes: Routes = [
    { path: '', component: PeliculasListComponent },
    { path: 'add', component: PeliculasAddComponent },
    { path: ':id/edit', component: PeliculasEditComponent },
    { path: ':id', component: PeliculasViewComponent },
    { path: ':id/:kk', component: PeliculasViewComponent },
  ];

@NgModule({
  declarations: [
    PELICULAS_COMPONENTES,
  ],
  exports: [
    PELICULAS_COMPONENTES,
    // PeliculasComponent,
    RouterModule,
  ],
  imports: [
    CommonModule, FormsModule, RouterModule.forChild(routes),
    JmaCoreModule, CommonServicesModule,
    PaginatorModule, CommonComponentModule, JmaCoreModule,
  ]
})
export class PeliculasModule { }
