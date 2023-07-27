/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive, forwardRef, ElementRef, Attribute, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NG_VALIDATORS, NgModel, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function nifValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) { return null; }
    const err = { nif: { invalidFormat: true, invalidChar: true, message: 'NIF invalido' } };
    if (/^\d{1,8}\w$/.test(control.value)) {
      const letterValue = control.value.substr(control.value.length - 1);
      const numberValue = control.value.substr(0, control.value.length - 1);
      err.nif.invalidFormat = false;
      return letterValue.toUpperCase() === 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(numberValue % 23) ? null : err;
    } else { return err; }
  };
}

@Directive({
  selector: '[nif][formControlName],[nif][formControl],[nif][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NIFValidator, multi: true }],
  standalone: true
})
export class NIFValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return nifValidator()(control);
  }
}

export function uppercaseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) { return null; }
    return control.value == control.value.toUpperCase() ? null : { uppercase: 'Debe estar en mayúsculas' }
  };
}

@Directive({
  selector: '[uppercase][formControlName],[uppercase][formControl],[uppercase][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UppercaseValidator, multi: true }],
  standalone: true
})
export class UppercaseValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return uppercaseValidator()(control);
  }
}

export function notblankValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !control.value || control.value.toString().trim() === '' ? { notblank: 'Requerido, no debe estar en blanco' } : null
  };
}

@Directive({
  selector: '[notblank][formControlName],[notblank][formControl],[notblank][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NotblankValidator, multi: true }],
  standalone: true
})
export class NotblankValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return notblankValidator()(control);
  }
}

@Directive({
  selector: '[type][formControlName],[type][formControl],[type][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => TypeValidator), multi: true }
  ],
  standalone: true
})
export class TypeValidator implements Validator {
  constructor(private elem: ElementRef) { }
  validate(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (valor) {
      const dom = this.elem.nativeElement;
      if (dom.validity) { // dom.checkValidity();
        return (dom.validity.typeMismatch || dom.validity.stepMismatch) ? { 'type': dom.validationMessage } : null;
      }
    }
    return null;
  }
}

export function equalsValidator(options: Array<string>): ValidatorFn {
  if (!options || options.length < 2)
    new Error('Faltan opciones para comparar')
  return (control: AbstractControl): { [key: string]: any } | null => {
    const form = control as FormGroup;
    const valor1 = control.get(options[0]) // form.controls[options[0]] as FormControl;
    const valor2 = form.controls[options[1]] as FormControl;
    return valor1?.value === valor2?.value ? null : { equals: `${options[2] ?? 'No son iguales'}` };
  };
}
@Directive({
  selector: '[equals]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualsValidator), multi: true }]
})
export class EqualsValidator implements Validator {
  constructor(@Attribute('equals') public options: string) { }
  validate(control: FormGroup): ValidationErrors | null {
    return equalsValidator(eval(this.options))(control)
  }
}
// <form #miForm="ngForm" equals="['nombre','apellidos','El nombre y los apellidos deben ser iguales']">

export function equalsToValidator(cntrlBind?: AbstractControl): ValidatorFn {
  let subscribe: boolean = false;
  return (control: AbstractControl): ValidationErrors | null => {
    if (!subscribe && cntrlBind) {
      subscribe = true;
      cntrlBind.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
      });
    }
    return (!cntrlBind || control.value !== cntrlBind.value) ? { 'equalsTo': `${control.value} distinto de ${cntrlBind?.value}` } : null;
  }
}

@Directive({
  selector: '[equalsTo]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualsToValidator), multi: true }],
})
export class EqualsToValidator implements Validator, OnChanges {
  @Input({alias: 'equalsTo', required: true }) cntrlBind?: NgModel
  private validator: ValidatorFn = () => null
  ngOnChanges(changes: SimpleChanges): void {
    this.validator = equalsToValidator(this.cntrlBind?.control)
  }
  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator(control)
  }
}

export const MIS_VALIDADORES = [NIFValidator, TypeValidator, UppercaseValidator, NotblankValidator, EqualsValidator, EqualsToValidator]
