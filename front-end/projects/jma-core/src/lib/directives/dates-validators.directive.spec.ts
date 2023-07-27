import { Component, ViewChild, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BeforeValidator, BeforeOrEqualsValidator, AfterValidator, AfterOrEqualsValidator, PastValidator, PastOrPresentValidator, FutureValidator, FutureOrPresentValidator, DateValidation } from './dates-validators.directive';

@Component({
  template: `
    <form>
      <input name="valor1" type="date" [(ngModel)]="valor1" #valor1ref="ngModel" past >
      <input name="valor2" type="date" [(ngModel)]="valor2" #valor2ref="ngModel" pastOrPresent>
      <input name="valor3" type="date" [(ngModel)]="valor3" #valor3ref="ngModel" futureOrPresent >
      <input name="valor4" type="date" [(ngModel)]="valor4" #valor4ref="ngModel" future >
      <input name="valor5" type="date" [(ngModel)]="valor5" #valor5ref="ngModel" [before]="fecha" >
      <input name="valor6" type="date" [(ngModel)]="valor6" #valor6ref="ngModel" [beforeOrEquals]="fecha" >
      <input name="valor7" type="date" [(ngModel)]="valor7" #valor7ref="ngModel" [afterOrEquals]="fecha" >
      <input name="valor8" type="date" [(ngModel)]="valor8" #valor8ref="ngModel" [after]="fecha" >
    </form>`,
  standalone: true,
  imports: [BeforeValidator, BeforeOrEqualsValidator, AfterValidator, AfterOrEqualsValidator,
    PastValidator, PastOrPresentValidator, FutureValidator, FutureOrPresentValidator, FormsModule]
})
class FechasComponent {
  valor1: string = '';
  @ViewChild("valor1ref") MyOutput1?: NgModel;
  valor2: string = '';
  @ViewChild("valor2ref") MyOutput2?: NgModel;
  valor3: string = '';
  @ViewChild("valor3ref") MyOutput3?: NgModel;
  valor4: string = '';
  @ViewChild("valor4ref") MyOutput4?: NgModel;
  valor5: string = '';
  @ViewChild("valor5ref") MyOutput5?: NgModel;
  valor6: string = '';
  @ViewChild("valor6ref") MyOutput6?: NgModel;
  valor7: string = '';
  @ViewChild("valor7ref") MyOutput7?: NgModel;
  valor8: string = '';
  @ViewChild("valor8ref") MyOutput8?: NgModel;
  fecha: string = 'text';
}

describe('FechasValidator', () => {
  let component: FechasComponent;
  let fixture: ComponentFixture<FechasComponent>;
  let tag: DebugElement;
  let hoy = '', ayer = '', mañana = ''

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FechasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tag = fixture.debugElement.query(By.css('form'));
  });

  beforeEach(() => {
    const diaEnMilisegundos = 1000 * 60 * 60 * 24
    const fecha = new Date();
    hoy = fecha.toISOString().substring(0, 10)
    ayer = (new Date(fecha.getTime() - diaEnMilisegundos)).toISOString().substring(0, 10)
    mañana = (new Date(fecha.getTime() + diaEnMilisegundos)).toISOString().substring(0, 10)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(tag).toBeDefined();
  });

  describe('PastValidator', () => {
    const id = 1, validador = 'past', message = 'Tiene que ser anterior a hoy'
    it('OK', async () => {
      const ok = ayer
      component[`valor${id}`] = ok
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ok)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeFalsy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBeNull();
    })
    it('KO', async () => {
      const ko = hoy
      component[`valor${id}`] = ko
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ko)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeTruthy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBe(message);
    })
  })
  describe('PastOrPresentValidator', () => {
    const id = 2, validador = 'pastOrPresent', message = 'Tiene que ser anterior o igual a hoy'
    it('OK Past', async () => {
      const ok = ayer
      component[`valor${id}`] = ok
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ok)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeFalsy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBeNull();
    })
    it('OK Present', async () => {
      const ok = hoy
      component[`valor${id}`] = ok
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ok)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeFalsy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBeNull();
    })
    it('KO', async () => {
      const ko = mañana
      component[`valor${id}`] = ko
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ko)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeTruthy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBe(message);
    })
  })

  describe('FutureOrPresentValidator  ', () => {
    const id = 3, validador = 'futureOrPresent', message = 'Tiene que ser posterior o igual a hoy'
    it('OK Present', async () => {
      const ok = hoy
      component[`valor${id}`] = ok
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ok)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeFalsy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBeNull();
    })
    it('OK Future', async () => {
      const ok = mañana
      component[`valor${id}`] = ok
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ok)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeFalsy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBeNull();
    })
    it('KO', async () => {
      const ko = ayer
      component[`valor${id}`] = ko
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ko)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeTruthy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBe(message);
    })
  })

  describe('FutureValidator ', () => {
    const id = 4, validador = 'future', message = 'Tiene que ser posterior a hoy'
    it('OK', async () => {
      const ok = mañana
      component[`valor${id}`] = ok
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ok)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeFalsy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBeNull();
    })
    it('KO', async () => {
      const ko = hoy
      component[`valor${id}`] = ko
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ko)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeTruthy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBe(message);
    })
  })

  describe('BeforeValidator ', () => {
    const id = 5, validador = 'before', message = 'Tiene que ser anterior'
    it('OK', async () => {
      const ok = ayer
      component.fecha = hoy
      component[`valor${id}`] = ok
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ok)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeFalsy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBeNull();
    })
    it('KO', async () => {
      const ko = hoy
      component.fecha = hoy
      component[`valor${id}`] = ko
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ko)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeTruthy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toContain(message);
    })
  })

  describe('BeforeOrEqualsValidator ', () => {
    const id = 6, validador = 'beforeOrEquals', message = 'Tiene que ser anterior'
    it('OK Before', async () => {
      const ok = ayer
      component.fecha = hoy
      component[`valor${id}`] = ok
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ok)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeFalsy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBeNull();
    })
    it('OK Equals', async () => {
      const ok = hoy
      component.fecha = hoy
      component[`valor${id}`] = ok
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ok)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeFalsy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBeNull();
    })
    it('KO', async () => {
      const ko = mañana
      component.fecha = hoy
      component[`valor${id}`] = ko
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ko)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeTruthy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toContain(message);
    })
  })

  describe('AfterOrEqualsValidator ', () => {
    const id = 7, validador = 'afterOrEquals', message = 'Tiene que ser posterior o igual'
    it('OK After', async () => {
      const ok = mañana
      component.fecha = hoy
      component[`valor${id}`] = ok
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ok)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeFalsy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBeNull();
    })
    it('OK Equals', async () => {
      const ok = hoy
      component.fecha = hoy
      component[`valor${id}`] = ok
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ok)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeFalsy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBeNull();
    })
    it('KO ', async () => {
      const ko = ayer
      component.fecha = hoy
      component[`valor${id}`] = ko
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ko)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeTruthy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toContain(message);
    })
  })

  describe('AfterValidator ', () => {
    const id = 8, validador = 'after', message = 'Tiene que ser posterior'
    it('OK', async () => {
      const ok = mañana
      component.fecha = hoy
      component[`valor${id}`] = ok
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ok)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeFalsy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toBeNull();
    })
    it('KO', async () => {
      const ko = hoy
      component.fecha = hoy
      component[`valor${id}`] = ko
      fixture.detectChanges();
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css(`[name=valor${id}]`)).nativeElement.value).toEqual(ko)
      expect(component[`MyOutput${id}`]?.hasError(validador)).toBeTruthy()
      expect(component[`MyOutput${id}`]?.getError(validador)).toContain(message);
    })
  })
  it('KO: No es una fecha correcta', async () => {
    const control = new FormControl('input');
    control.setValue(hoy);
    expect(() => DateValidation('101-01-2001',(a, b) => a < b )(control)).toThrow()
  })
});
