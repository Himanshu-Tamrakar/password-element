import { AbstractControl, ValidatorFn } from '@angular/forms';

export class PasswordStrengthValidator {

  isUndefinedOrEmpty(control: AbstractControl): any | undefined {
    // if (!control || !control.value || control.value.length === 0) {
    //   return undefined;
    // }
  }

  validate(criteria: string, regex: RegExp): boolean {
    return regex.test(criteria);
  }

  confirm(password: string): void {
    // const validator = (control: AbstractControl): { [key: string]: any } => {
    //   this.isUndefinedOrEmpty(control);
    //   if (control.value !== password) {
    //     return {
    //       notConfirmed: {
    //         password: password,
    //         passwordConfirmation: control.value
    //       }
    //     }
    //   }
    //   return undefined;
    // };
    // return validator;
  }

}
