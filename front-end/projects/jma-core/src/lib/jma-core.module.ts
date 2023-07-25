import { NgModule } from '@angular/core';
import { MIS_VALIDADORES } from './directives/mis-validadores.directive';
import { PIPES_CADENAS } from './pipes/cadenas.pipe';
import { PIPES_NUMERICOS } from './pipes/numericos.pipe';
import { SizerComponent } from './components/sizer.component';
import { UnlessDirective } from './directives/estructurales.directive';
import { DIRECTIVAS_ATRIBUTO } from './directives/atributos.directive';



@NgModule({
  declarations: [
  ],
  exports: [
    MIS_VALIDADORES, PIPES_CADENAS, PIPES_NUMERICOS, SizerComponent, DIRECTIVAS_ATRIBUTO, UnlessDirective,
  ],
  imports: [
    MIS_VALIDADORES, PIPES_CADENAS, PIPES_NUMERICOS, SizerComponent, DIRECTIVAS_ATRIBUTO, UnlessDirective,
  ]
})
export class JmaCoreModule { }
