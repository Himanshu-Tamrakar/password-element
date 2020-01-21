import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { _PRule, _Requirements } from '../../interface/password-rule';
import { PasswordStrengthInfoComponent } from '../password-strength-info/password-strength-info.component';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnInit {
  @Input('passwordRule') passwordRule: _PRule;
  @Output() validatedPassword = new EventEmitter<string>();

  @ViewChild(PasswordStrengthInfoComponent, { static: false }) passwordStrengthInfoComponent: any;

  requirments: _Requirements = {
    at_least_x_chars: false,
    at_max_x_chars: false,
    at_least_one_lower_case_char: false,
    at_least_one_upper_case_char: false,
    at_least_one_digit_char: false,
    at_least_one_special_char: false,
    password: ''
  };;
  constructor() { }

  ngOnInit() {
    console.log("Rule", this.passwordRule);
  }

  public passwordValidityChange(requirments: _Requirements) {

    this.requirments = requirments;

    // To Run Change Detection on Child Component
    this.passwordStrengthInfoComponent.runChangeDetection()

    if (requirments.at_least_x_chars && requirments.at_max_x_chars && requirments.at_least_one_lower_case_char && requirments.at_least_one_upper_case_char && requirments.at_least_one_digit_char && requirments.at_least_one_special_char)
      this.validatedPassword.emit(requirments.password);

    // if (this.isRequirementsChagedWithOlder(requirments)) {
    //   debugger
    //   this.requirments = JSON.parse(JSON.stringify(requirments));
    //   // this.requirments = { ...requirments }
    //
    //   // To Run Change Detection on Child Component
    //   this.passwordStrengthInfoComponent.runChangeDetection()
    //
    //   if (requirments.at_least_x_chars && requirments.at_max_x_chars && requirments.at_least_one_lower_case_char && requirments.at_least_one_upper_case_char && requirments.at_least_one_digit_char && requirments.at_least_one_special_char)
    //     this.validatedPassword.emit(requirments.password);
    // }
  }

  // isRequirementsChagedWithOlder(newReq: _Requirements): boolean {
  //   debugger
  //   if (this.requirments.at_least_x_chars != newReq.at_least_x_chars || this.requirments.at_max_x_chars != newReq.at_max_x_chars ||
  //     this.requirments.at_least_one_lower_case_char != newReq.at_least_one_lower_case_char || this.requirments.at_least_one_upper_case_char != newReq.at_least_one_upper_case_char ||
  //     this.requirments.at_least_one_digit_char != newReq.at_least_one_digit_char || this.requirments.at_least_one_special_char != newReq.at_least_one_special_char) return true;
  //
  //   return false;
  // }

}
