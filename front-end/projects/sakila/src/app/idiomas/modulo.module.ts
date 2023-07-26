import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JmaCoreModule } from 'jma-core';
import { CommonServicesModule } from '../common-services';
import { IdiomasComponent } from './componente.component';
import { CommonComponentModule } from '../common-component';

export const routes: Routes = [
  { path: '', component: IdiomasComponent },
];

@NgModule({
  declarations: [
    IdiomasComponent,
  ],
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule, FormsModule, RouterModule.forChild(routes),
    JmaCoreModule, CommonServicesModule,
    CommonComponentModule, JmaCoreModule,
  ]
})
export default class IdiomasModule { }
