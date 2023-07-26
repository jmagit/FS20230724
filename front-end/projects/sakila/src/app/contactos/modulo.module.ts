import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JmaCoreModule } from 'jma-core';
import { CommonServicesModule } from '../common-services';
import { CONTACTOS_COMPONENTES, ContactosComponent, ContactosAddComponent, ContactosEditComponent, ContactosListComponent, ContactosViewComponent } from './componente.component';
import {PaginatorModule} from 'primeng/paginator';
import { CommonComponentModule } from '../common-component';

export const routes: Routes = [
  { path: '', component: ContactosListComponent },
  { path: 'add', component: ContactosAddComponent },
  { path: ':id/edit', component: ContactosEditComponent },
  { path: ':id', component: ContactosViewComponent },
  { path: ':id/:kk', component: ContactosViewComponent },
];

@NgModule({
  declarations: [
    CONTACTOS_COMPONENTES,
  ],
  exports: [
    CONTACTOS_COMPONENTES,
    // ContactosComponent,
  ],
  imports: [
    CommonModule, FormsModule, RouterModule.forChild(routes),
    JmaCoreModule, CommonServicesModule,
    PaginatorModule, CommonComponentModule, JmaCoreModule,
  ]
})
export class ContactosModule { }
