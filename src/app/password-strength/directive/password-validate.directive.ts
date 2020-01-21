import { Directive, ElementRef, Input, Output, OnInit, EventEmitter, HostListener } from '@angular/core';
import { _PRule, _Requirements } from '../interface/password-rule';
import { RegExpValidator } from '../validator/regexp.class';
import { PasswordStrengthValidator } from '../validator/password-strength-validator';

@Directive({
  selector: `[password-validate]`
})
export class PasswordValidateDirective extends PasswordStrengthValidator implements OnInit {

  @Input('passwordRule') passwordRule: _PRule;
  @Output() passwordValidityChange = new EventEmitter<_Requirements>();

  private criteria: _Requirements = {
    at_least_x_chars: false,
    at_max_x_chars: false,
    at_least_one_lower_case_char: false,
    at_least_one_upper_case_char: false,
    at_least_one_digit_char: false,
    at_least_one_special_char: false,
    password: ''
  };

  constructor(private el: ElementRef) { super() }

  ngOnInit() {
    console.log("input: ", this.passwordRule, RegExpValidator);
  }

  private _containAtLeastMinChars(password: string): boolean {
    return (password.length >= this.passwordRule.at_least_x_chars);
  }

  private _containMaxChars(password: string): boolean {
    return password.length <= this.passwordRule.at_max_x_chars;
  }

  private _containAtLeastOneLowerCaseLetter(password: string): boolean {
    return this.validate(password, RegExpValidator.lowerCase);
  }

  private _containAtLeastOneUpperCaseLetter(password: string): boolean {
    return this.validate(password, RegExpValidator.upperCase);
  }

  private _containAtLeastOneDigit(password: string): boolean {
    return this.validate(password, RegExpValidator.digit);
  }

  private _containAtLeastOneSpecialChar(password: string): boolean {
    return this.validate(password, RegExpValidator.specialChar);
  }

  @HostListener('keyup', ['$event']) onkeyup(event: KeyboardEvent) {
    this.criteria['password'] = event['target']['value'];
    this.criteria['at_least_x_chars'] = this._containAtLeastMinChars(event['target']['value']);
    this.criteria['at_max_x_chars'] = this._containMaxChars(event['target']['value']);
    this.criteria['at_least_one_lower_case_char'] = this._containAtLeastOneLowerCaseLetter(event['target']['value']);
    this.criteria['at_least_one_upper_case_char'] = this._containAtLeastOneUpperCaseLetter(event['target']['value']);
    this.criteria['at_least_one_digit_char'] = this._containAtLeastOneDigit(event['target']['value']);
    this.criteria['at_least_one_special_char'] = this._containAtLeastOneSpecialChar(event['target']['value']);
    this.passwordValidityChange.emit(this.criteria)
  }

}
