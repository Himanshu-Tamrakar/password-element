import { Directive, ElementRef, Input, Output, OnInit, EventEmitter, HostListener, ChangeDetectorRef } from '@angular/core';
import { _PRule, _Requirements } from '../interface/password-rule';
import { RegExpValidator } from '../validator/regexp.class';
import { PasswordStrengthValidator } from '../validator/password-strength-validator';
import { Subscription, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Directive({
  selector: `[password-validate]`
})
export class PasswordValidateDirective extends PasswordStrengthValidator implements OnInit {
  public keyUp = new Subject<KeyboardEvent>();
  private subscription: Subscription;

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

  constructor(private el: ElementRef, private changeDetector: ChangeDetectorRef) { super() }

  ngOnInit() {
    this.subscription = this.keyUp.pipe(
      map(event => event['target']['value']),
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((value) => {
      if (this.passwordRule.at_least_x_chars) this.criteria['at_least_x_chars'] = this._containAtLeastMinChars(value);
      if (this.passwordRule.at_max_x_chars) this.criteria['at_max_x_chars'] = this._containMaxChars(value);
      if (this.passwordRule.at_least_one_lower_case_char) this.criteria['at_least_one_lower_case_char'] = this._containAtLeastOneLowerCaseLetter(value);
      if (this.passwordRule.at_least_one_upper_case_char) this.criteria['at_least_one_upper_case_char'] = this._containAtLeastOneUpperCaseLetter(value);
      if (this.passwordRule.at_least_one_digit_char) this.criteria['at_least_one_digit_char'] = this._containAtLeastOneDigit(value);
      if (this.passwordRule.at_least_one_special_char) this.criteria['at_least_one_special_char'] = this._containAtLeastOneSpecialChar(value);

      this.passwordValidityChange.emit(this.criteria)
      this.changeDetector.detectChanges();

    });
  }

  private _containAtLeastMinChars(password: string): boolean {
    return (password.length >= this.passwordRule.at_least_x_chars);
  }

  private _containMaxChars(password: string): boolean {
    return (password.length <= this.passwordRule.at_max_x_chars) && (password.length > 0);
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
    this.keyUp.next(event);
  }

  // ngOnDestroy(): void {
  //   alert()
  //   this.subscription.unsubscribe();
  // }

}
