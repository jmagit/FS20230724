import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, PageNotFoundComponent } from './main';
import { PeliculasListComponent, routes as PeliculasRoutes } from './peliculas';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'inicio', component: HomeComponent},
  { path: 'catalogo', children: PeliculasRoutes},
  { path: 'actores/:id/:nom/:idPeli/:tit', redirectTo: '/catalogo/:idPeli/:tit' },
  { path: 'categorias', component: PeliculasListComponent, data: { search: 'categorias'}},
  { path: 'actores', loadChildren: () => import('./actores/modulo.module')},
  { path: 'idiomas', loadChildren: () => import('./idiomas/modulo.module')},

  { path: '404.html', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
