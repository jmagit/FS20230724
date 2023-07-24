/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';
import { ErrorMessagePipe } from '../pipes/cadenas.pipe';

@Directive({
    selector: `[jmaWinConfirm]`,
    standalone: true
})
export class WindowConfirmDirective {
  @Output('jmaWinConfirm') winConfirm: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('jmaWinConfirmMessage') winConfirmMessage = '¿Seguro?';
  @HostBinding('class.pressed') isPressed: boolean = false;

  @HostListener('click', ['$event'])
  confirmFirst() {
    if (window.confirm(this.winConfirmMessage)) {
      this.winConfirm.emit(null);
    }
  }
  @HostListener('mousedown') hasPressed() { this.isPressed = true; }
  @HostListener('mouseup') hasReleased() { this.isPressed = false; }
}

@Directive({
    selector: '[show]',
    standalone: true
})
export class ShowDirective {
  @HostBinding() hidden: boolean = false;
  @Input() set show(value: boolean) {
    this.hidden = !value;
  }
}

@Directive({
    selector: '[focused]',
    standalone: true
})
export class FocusedDirective {
  @Input() set focused(value: boolean) { if(value) this.el.nativeElement.focus(); }
  constructor(private el: ElementRef) {
 }
}

@Directive({
    selector: '[jmaShowErrors]',
    standalone: true
})
export class ShowErrorsDirective implements OnChanges {
  private pipe = new ErrorMessagePipe();

  @Input('jmaShowErrors') errors: any = undefined;
  @HostBinding('textContent') mensaje: string = '';
  @HostBinding('hidden') hidden: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.errors) {
      this.hidden = true;
      return;
    }
    this.mensaje =this.pipe.transform(this.errors);
    this.hidden = this.mensaje === '';
  }
}

@Directive({
    selector: '[jmaShadow]',
    standalone: true
})
export class ShadowDirective {
  constructor(el: ElementRef, renderer: Renderer2) {
    //el.nativeElement.style.boxShadow = '10px 10px 5px #888888';
    renderer.setStyle(el.nativeElement, 'box-shadow', '10px 10px 5px #888888');
  }
}

export const DIRECTIVAS_ATRIBUTO = [WindowConfirmDirective, ShowDirective, ShowErrorsDirective, FocusedDirective, ShadowDirective, ]
