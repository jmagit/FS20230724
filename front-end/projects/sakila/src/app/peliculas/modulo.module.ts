import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { ErrorMessagePipe, NotblankValidator, TypeValidator } from 'jma-core';
import { CommonServicesModule } from '../common-services';
import { PELICULAS_COMPONENTES, PeliculasAddComponent, PeliculasEditComponent, PeliculasViewComponent, PeliculasListComponent, PeliculasListBodyComponent } from './componente.component';
import { CommonComponentModule } from '../common-component';
import { AuthWithRedirectCanActivate, InRoleCanActivate } from '../security';
import { environment } from '../../environments/environment';

export const routes: Routes = [
  { path: '', component: PeliculasListComponent },
  {
    path: 'add', component: PeliculasAddComponent,
    canActivate: [AuthWithRedirectCanActivate('/login'), InRoleCanActivate(environment.roleMantenimiento)]
  },
  {
    path: ':id/edit', component: PeliculasEditComponent,
    canActivate: [AuthWithRedirectCanActivate('/login'), InRoleCanActivate(environment.roleMantenimiento)]
  },
  { path: ':id', component: PeliculasViewComponent },
  { path: ':id/:kk', component: PeliculasViewComponent },
];

@NgModule({
  declarations: [
    PELICULAS_COMPONENTES,
  ],
  exports: [
    PELICULAS_COMPONENTES,
    RouterModule, PeliculasListBodyComponent,
  ],
  imports: [
    CommonModule, FormsModule, RouterModule.forChild(routes),
    PaginatorModule, CommonServicesModule, CommonComponentModule, PeliculasListBodyComponent,
    ErrorMessagePipe, NotblankValidator, TypeValidator,
  ]
})
export class PeliculasModule { }
