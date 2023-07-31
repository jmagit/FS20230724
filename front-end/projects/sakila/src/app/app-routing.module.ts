import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, PageNotFoundComponent } from './main';
import { PeliculasListComponent, routes as PeliculasRoutes } from './peliculas';
import { AuthCanActivateFn, AuthWithRedirectCanActivate, InRoleCanActivate, LoginFormComponent, RegisterUserComponent } from './security';
import { environment } from '../environments/environment';
import { NovedadesComponent } from './novedades/novedades.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: NovedadesComponent },
  { path: 'inicio', component: NovedadesComponent },
  { path: 'catalogo/categorias', component: PeliculasListComponent, data: { search: 'categorias' }, title: 'categorias' },
  { path: 'catalogo/categorias/:idPeli/:tit', redirectTo: '/catalogo/:idPeli/:tit', title: 'catalogo' },
  { path: 'catalogo', children: PeliculasRoutes, title: 'catalogo' },
  { path: 'actores/:id/:nom/:idPeli/:tit', redirectTo: '/catalogo/:idPeli/:tit', title: 'catalogo' },
  {
    path: 'actores', loadChildren: () => import('./actores/modulo.module'), title: 'actores',
    canActivate: [AuthWithRedirectCanActivate('/login'), InRoleCanActivate(environment.roleMantenimiento)]
  },
  {
    path: 'categorias', loadChildren: () => import('./categorias/modulo.module'), title: 'categorias',
    canActivate: [AuthWithRedirectCanActivate('/login'), InRoleCanActivate(environment.roleMantenimiento)]
  },
  {
    path: 'idiomas', loadChildren: () => import('./idiomas/modulo.module'), title: 'idiomas',
    canActivate: [AuthWithRedirectCanActivate('/login'), InRoleCanActivate(environment.roleMantenimiento)]
  },
  {
    path: 'contactos', loadChildren: () => import('./contactos/modulo.module').then(mod => mod.ContactosModule), title: 'contactos',
    canActivate: [AuthCanActivateFn]
  },

  { path: 'login', component: LoginFormComponent },
  { path: 'registro', component: RegisterUserComponent },

  { path: '404.html', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
