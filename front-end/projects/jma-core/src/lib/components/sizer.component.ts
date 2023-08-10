import { Component, EventEmitter, Input, Output, numberAttribute } from '@angular/core';

@Component({
  selector: 'jma-sizer',
  standalone: true,
  template: `
    <div>
      <output [style.font-size.px]="size">FontSize: {{size}}px</output>
      <button (click)="dec()">-</button>
      <button (click)="inc()">+</button>
    </div>
  `
})
export class SizerComponent {
  @Input({transform: numberAttribute})  size: number = 12;
  @Output() sizeChange = new EventEmitter<number>();

  dec() : void { this.resize(-1); }
  inc() : void { this.resize(+1); }

  resize(delta: number) : void {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }
}
