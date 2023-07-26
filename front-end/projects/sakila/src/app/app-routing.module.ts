import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, PageNotFoundComponent } from './main';
import { PeliculasListComponent, routes as PeliculasRoutes } from './peliculas';
// import { } from '..'
const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'inicio', component: HomeComponent},
  { path: 'catalogo', children: PeliculasRoutes},
  { path: 'categorias', component: PeliculasListComponent, data: { type: 'categorias'}},

  { path: '404.html', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
