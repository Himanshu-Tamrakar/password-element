import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordStrengthComponent } from './component/password-strength/password-strength.component';
import { PasswordStrengthInfoComponent } from './component/password-strength-info/password-strength-info.component';
import { PasswordValidateDirective } from './directive/password-validate.directive';

import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule
} from "@angular/material";

const modules = [
  CommonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule
];

export { PasswordStrengthValidator } from './validator/password-strength-validator'

@NgModule({
  declarations: [PasswordStrengthComponent, PasswordStrengthInfoComponent, PasswordValidateDirective],
  imports: [modules],
  exports:[PasswordStrengthComponent, PasswordStrengthInfoComponent]
})
export class PasswordStrengthModule {}
