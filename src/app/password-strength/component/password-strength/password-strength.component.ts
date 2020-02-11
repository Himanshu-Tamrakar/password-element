import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _PRule, _Requirements } from '../../interface/password-rule';
import { PasswordStrengthInfoComponent } from '../password-strength-info/password-strength-info.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnInit {
  @Input('passwordRule') passwordRule: _PRule;
  @Output() validatedPassword = new EventEmitter<object>();

  @ViewChild(PasswordStrengthInfoComponent, { static: true }) passwordStrengthInfoComponent: PasswordStrengthInfoComponent;
  error = false;

  requirments: _Requirements = {
    at_least_x_chars: false,
    at_max_x_chars: false,
    at_least_one_lower_case_char: false,
    at_least_one_upper_case_char: false,
    at_least_one_digit_char: false,
    at_least_one_special_char: false,
    password: ''
  };

  hide = true;

  constructor(private changeDetector: ChangeDetectorRef) { }

  checkChildRef() {
    console.log(this.passwordStrengthInfoComponent)
  }

  ngOnInit() {
    this.checkValidityAndUpdate(this.passwordRule);
  }

  private checkValidityAndUpdate(passwordRule: _PRule): void {
    if (!this.passwordRule.hasOwnProperty('at_least_x_chars') || !this.passwordRule.hasOwnProperty('at_max_x_chars')
      || !this.passwordRule.hasOwnProperty('at_least_one_lower_case_char') || !this.passwordRule.hasOwnProperty('at_least_one_upper_case_char')
      || !this.passwordRule.hasOwnProperty('at_least_one_digit_char') || !this.passwordRule.hasOwnProperty('at_least_one_special_char')
    ) {
      alert("It seems like you haven't send correct rule! All fields are mandatory.");
      this.error = true;
      return;
    }

    if (((typeof this.passwordRule.at_least_x_chars) != 'number') || ((typeof this.passwordRule.at_max_x_chars) != 'number')
      || ((typeof this.passwordRule.at_least_one_lower_case_char) != 'boolean') || ((typeof this.passwordRule.at_least_one_upper_case_char) != 'boolean')
      || ((typeof this.passwordRule.at_least_one_digit_char) != 'boolean') || ((typeof this.passwordRule.at_least_one_special_char) != 'boolean')
    ) {
      alert("It seems like you haven't send correct rule! All fields are mandatory.");
      this.error = true;
      return;
    }

    if (this.passwordRule.at_least_x_chars < 8) this.passwordRule.at_least_x_chars = 8;
    if (this.passwordRule.at_max_x_chars > 30) this.passwordRule.at_max_x_chars = 30;

  }

  public passwordValidityChange(requirments: _Requirements) {
    this.requirments = requirments;

    debugger
    // To Run Change Detection on Child Component
    this.passwordStrengthInfoComponent.runChangeDetection()

    this.emitValue(requirments);
  }

  private emitValue(requirments: _Requirements): void {
    debugger
    if (!requirments['at_least_x_chars'] || !requirments['at_max_x_chars']) {
      this.validatedPassword.emit({ passworCheck: false, password: requirments.password });
      this.changeDetector.detectChanges();
      return;
    }

    const keys: String[] = _.keys(_.omit(this.passwordRule, ['at_least_x_chars', 'at_max_x_chars']));


    for(let i=0; i < keys.length; i++) {
      const k: string = String(keys[i]);

      if(this.passwordRule[k] && !requirments[k]) {
          this.validatedPassword.emit({passworCheck: false, password: requirments.password});
          this.changeDetector.detectChanges();
          return;
      }
    }

    this.validatedPassword.emit({ passworCheck: true, password: requirments.password });

    this.changeDetector.detectChanges();
  }

}
