import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SizerComponent } from './sizer.component';

describe('SizerComponent', () => {
  let component: SizerComponent;
  let fixture: ComponentFixture<SizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SizerComponent]
    });
    fixture = TestBed.createComponent(SizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('decremento', () => {
    component.dec()
    expect(component.size).toBe(11);
  });

  it('incremento', () => {
    component.inc()
    expect(component.size).toBe(13);
  });
});
