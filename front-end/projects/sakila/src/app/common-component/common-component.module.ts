import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { FormButtonsComponent } from './form-buttons/form-buttons.component';



@NgModule({
  declarations: [
    CardComponent, FormButtonsComponent,
  ],
  exports: [
    CardComponent, FormButtonsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class CommonComponentModule { }
