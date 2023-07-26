import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonServicesModule } from '../common-services';
import { CommonComponentModule } from '../common-component';
import { CategoriasComponent } from './componente.component';
import { ErrorMessagePipe, NotblankValidator } from 'jma-core';

export const routes: Routes = [
  { path: '', component: CategoriasComponent },
];

@NgModule({
  declarations: [
    CategoriasComponent,
  ],
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule, FormsModule, RouterModule.forChild(routes),
    CommonServicesModule, CommonComponentModule,
    ErrorMessagePipe, NotblankValidator,
  ]
})
export default class CategoriasModule { }
