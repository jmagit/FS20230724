import { FormControl, FormsModule, NgForm, NgModel } from '@angular/forms';
import { EqualsToValidator, EqualsValidator, nifValidator, NIFValidator, notblankValidator, NotblankValidator, TypeValidator, uppercaseValidator, UppercaseValidator } from './mis-validadores.directive';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('NifValidator', () => {
  const esNIF = nifValidator()
  const control = new FormControl('input');

  describe('NIF OK', () => {
    ['12345678z', '12345678Z', '1234S', '4g', null].forEach(caso => {
      it(`NIF: ${caso}`, () => {
        control.setValue(caso);
        expect(esNIF(control)).toBeNull()
      })
    })
  });

  describe('NIF KO', () => {
    ['1234J', '12345678', 'Z', 'Z12345678'].forEach(caso => {
      it(`NIF: ${caso}`, () => {
        control.setValue(caso);
        expect(esNIF(control)).not.toBeNull()
      })
    })
  });
  it('NifValidatorDirective', () => {
    const directive = new NIFValidator();
    control.setValue(null);
    expect(directive.validate(control)).toBeNull();
  })
});

@Component({
  template: `<input type="text" [(ngModel)]="valor" #myInput="ngModel" nif >`
})
class NIFValidatorHostComponent {
  @ViewChild('myInput') control?: FormControl<string>
  valor = '';
}

describe('NifValidatorDirective', () => {
  let component: NIFValidatorHostComponent;
  let fixture: ComponentFixture<NIFValidatorHostComponent>;
  const control = new FormControl('input');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NIFValidatorHostComponent],
      imports: [FormsModule, NIFValidator]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NIFValidatorHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`OK`, waitForAsync(() => {
    const valor = '12345678z'
    component.valor = valor
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      expect(component.control).withContext('control').toBeDefined()
      expect(component.control?.value).withContext('value').toBe(valor)
      expect(component.control?.valid).withContext('valid').toBeTrue()
      expect(component.control?.errors).withContext('errors').toBeNull()
    })
  }))

  it(`KO`, waitForAsync(async () => {
    const valor = '12345678'
    component.valor = valor
    fixture.detectChanges()
    await fixture.whenStable()
    expect(component.control).withContext('control').toBeDefined()
    expect(component.control?.value).withContext('value').toBe(valor)
    expect(component.control?.invalid).withContext('invalid').toBeTrue()
    expect(component.control?.errors).withContext('errors').toBeDefined()
    expect(component.control?.errors?.['nif']).withContext('nif').toBeDefined()
  }))
});

describe('UppercaseValidator', () => {
  const esUppercase = uppercaseValidator()
  const control = new FormControl('input');
  describe('Uppercase OK', () => {
    ['12345678', 'CASA', null].forEach(caso => {
      it(`Uppercase: ${caso}`, () => {
        control.setValue(caso);
        expect(esUppercase(control)).toBeNull()
      })
    })
  });

  describe('Uppercase KO', () => {
    ['Algo', '12345678z', 'casa'].forEach(caso => {
      it(`Uppercase: ${caso}`, () => {
        control.setValue(caso);
        expect(esUppercase(control)).not.toBeNull()
      })
    })
  });

  it('UppercaseValidatorDirective', () => {
    const directive = new UppercaseValidator();
    control.setValue(null);
    expect(directive.validate(control)).toBeNull();
  })
});

describe('NotblankValidator', () => {
  const esNotblank = notblankValidator()
  const control = new FormControl('input');
  describe('Notblank OK', () => {
    ['1 ', 'CASA'].forEach(caso => {
      it(`Notblank: ${caso}`, () => {
        control.setValue(caso);
        expect(esNotblank(control)).toBeNull()
      })
    })
  });

  describe('Notblank KO', () => {
    ['', '  ', null].forEach(caso => {
      it(`Notblank: '${caso}'`, () => {
        control.setValue(caso);
        expect(esNotblank(control)).not.toBeNull()
      })
    })
  });

  it('NotblankValidatorDirective', () => {
    const directive = new NotblankValidator();
    control.setValue('null');
    expect(directive.validate(control)).toBeNull();
  })
});

@Component({
  template: `<form><input name="demo" [type]="tipo" [(ngModel)]="valor" #MyOutput="ngModel" step="0.01" ></form>`,
  standalone: true,
  imports: [TypeValidator, FormsModule]
})
class TypeValidatorHostComponent {
  valor: string | number = '';
  tipo: string = 'text';
  @ViewChild(NgModel) MyOutput?: NgModel;
}
describe('TypeValidator', () => {
  let component: TypeValidatorHostComponent;
  let fixture: ComponentFixture<TypeValidatorHostComponent>;
  let tag: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeValidatorHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeValidatorHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tag = fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(tag).toBeDefined();
  });
  describe('TypeValidator OK', () => {
    [
      { tipo: 'email', valor: 'a@a' },
      { tipo: 'email', valor: '' },
      { tipo: 'url', valor: 'http://example.com' },
      { tipo: 'number', valor: 1.5 },
      { tipo: 'number', valor: 5 },
    ].forEach(({ tipo, valor }) => {
      it(`tipo: ${tipo} value: ${valor}`, async () => {
        component.tipo = tipo
        component.valor = valor
        fixture.detectChanges();
        await fixture.whenStable()
        expect(tag.nativeElement.value).toEqual(valor.toString())
        expect(component.MyOutput?.control.value).toEqual(valor)
        expect(component.MyOutput?.hasError('type')).toBeFalsy()
        expect(component.MyOutput?.getError('type')).toBeNull();
      })
    })
  });
  describe('TypeValidator KO', () => {
    [
      { tipo: 'email', valor: 'aa' },
      { tipo: 'email', valor: 'http://example.com' },
      { tipo: 'url', valor: 'a@a' },
      { tipo: 'number', valor: 1.532 },
    ].forEach(({ tipo, valor }) => {
      it(`tipo: ${tipo} value: ${valor}`, async () => {
        component.tipo = tipo
        component.valor = valor
        fixture.detectChanges();
        await fixture.whenStable()
        expect(tag.nativeElement.value).toEqual(valor.toString())
        expect(component.MyOutput?.control.value).toEqual(valor)
        expect(component.MyOutput?.hasError('type')).toBeTruthy()
        expect(component.MyOutput?.getError('type')).not.toBeNull()
      })
    })
  });
});

@Component({
  template: `
    <form #miForm="ngForm" equals="['valor1','valor2','El valor1 y el valor2 deben ser iguales']">
      <input name="valor1" [type]="tipo" [(ngModel)]="valor1" #valor1ref="ngModel" >
      <input name="valor2" [type]="tipo" [(ngModel)]="valor2" #valor2ref="ngModel" >
      <input name="valor3" [type]="tipo" [(ngModel)]="valor3" #valor3ref="ngModel" [equalsTo]="valor1ref" >
    </form>`,
  standalone: true,
  imports: [EqualsValidator, EqualsToValidator, FormsModule]
})
class EqualsValidatorHostComponent {
  valor1: string | number = '';
  valor2: string | number = '';
  valor3: string | number = '';
  tipo: string = 'text';
  @ViewChild(NgForm) MyOutput?: NgForm;
  @ViewChild("valor3ref") MyOutput2?: NgModel;
}

describe('EqualsValidator', () => {
  let component: EqualsValidatorHostComponent;
  let fixture: ComponentFixture<EqualsValidatorHostComponent>;
  let tag: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EqualsValidatorHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EqualsValidatorHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tag = fixture.debugElement.query(By.css('form'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(tag).toBeDefined();
  });
  describe('EqualsValidator OK', () => {
    [
      { tipo: 'text', valor: 'a@a' },
      { tipo: 'email', valor: 'a@a' },
      { tipo: 'number', valor: 5 },
    ].forEach(({ tipo, valor }) => {
      it(`tipo: ${tipo} value: ${valor}`, async () => {
        component.tipo = tipo
        component.valor1 = valor
        component.valor2 = valor
        fixture.detectChanges();
        await fixture.whenStable()
        expect(fixture.debugElement.query(By.css('[name=valor1]')).nativeElement.value).toEqual(valor.toString())
        expect(fixture.debugElement.query(By.css('[name=valor2]')).nativeElement.value).toEqual(valor.toString())
        expect(component.MyOutput?.hasError('equals')).toBeFalsy()
        expect(component.MyOutput?.getError('equals')).toBeNull();
      })
    })
  });
  describe('EqualsValidator KO', () => {
    [
      { tipo: 'text', valor1: 'a@a', valor2: 'aa' },
      { tipo: 'number', valor1: 5, valor2: 4 },
    ].forEach(({ tipo, valor1, valor2 }) => {
      it(`tipo: ${tipo} values: ${valor1} ${valor2}`, async () => {
        component.tipo = tipo
        component.valor1 = valor1
        component.valor2 = valor2
        fixture.detectChanges();
        await fixture.whenStable()
        expect(fixture.debugElement.query(By.css('[name=valor1]')).nativeElement.value).toEqual(valor1.toString())
        expect(fixture.debugElement.query(By.css('[name=valor2]')).nativeElement.value).toEqual(valor2.toString())
        expect(component.MyOutput?.hasError('equals')).toBeTruthy()
        expect(component.MyOutput?.getError('equals')).toBe('El valor1 y el valor2 deben ser iguales');
      })
    })
  });
});

describe('EqualsToValidator', () => {
  let component: EqualsValidatorHostComponent;
  let fixture: ComponentFixture<EqualsValidatorHostComponent>;
  let tag: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EqualsValidatorHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EqualsValidatorHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tag = fixture.debugElement.query(By.css('form'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(tag).toBeDefined();
  });
  describe('EqualsToValidator OK', () => {
    [
      { tipo: 'text', valor: 'a@a' },
      { tipo: 'email', valor: 'a@a' },
      { tipo: 'number', valor: 5 },
    ].forEach(({ tipo, valor }) => {
      it(`tipo: ${tipo} value: ${valor}`, async () => {
        component.tipo = tipo
        component.valor1 = valor
        component.valor3 = valor
        fixture.detectChanges();
        await fixture.whenStable()
        expect(fixture.debugElement.query(By.css('[name=valor1]')).nativeElement.value).toEqual(valor.toString())
        expect(fixture.debugElement.query(By.css('[name=valor3]')).nativeElement.value).toEqual(valor.toString())
        expect(component.MyOutput2?.hasError('equalsTo')).toBeFalsy()
        expect(component.MyOutput2?.getError('equalsTo')).toBeNull();
      })
    })
  });
  describe('EqualsToValidator KO', () => {
    [
      { tipo: 'text', valor1: 'a@a', valor3: 'aa' },
      { tipo: 'number', valor1: 5, valor3: 4 },
    ].forEach(({ tipo, valor1, valor3 }) => {
      it(`tipo: ${tipo} values: ${valor1} ${valor3}`, async () => {
        component.tipo = tipo
        component.valor1 = valor1
        component.valor3 = valor3
        fixture.detectChanges();
        await fixture.whenStable()
        expect(fixture.debugElement.query(By.css('[name=valor1]')).nativeElement.value).toEqual(valor1.toString())
        expect(fixture.debugElement.query(By.css('[name=valor3]')).nativeElement.value).toEqual(valor3.toString())
        expect(component.MyOutput2?.hasError('equalsTo')).toBeTruthy()
        expect(component.MyOutput2?.getError('equalsTo')).not.toBeNull()
      })
    })
  });
});
