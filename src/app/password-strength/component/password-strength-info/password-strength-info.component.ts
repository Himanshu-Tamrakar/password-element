import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _PRule, _Requirements } from '../../interface/password-rule';
import * as _ from 'lodash';

@Component({
  selector: 'app-password-strength-info',
  templateUrl: './password-strength-info.component.html',
  styleUrls: ['./password-strength-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordStrengthInfoComponent {
  @Input('requirments') requirments: _Requirements;
  @Input('passwordRule') passwordRule: _PRule;

  constructor(private cd: ChangeDetectorRef) { }

  showInfo = false;

  // ngOnInit() {
  //   // this.passwordRule = this.getPasswordRule();
  // }

  runChangeDetection(): void {
    this.showInfo = this.infoVisible(this.requirments);
    this.cd.detectChanges();
  }

  private infoVisible(requirments:_Requirements): boolean {
    if (!requirments['at_least_x_chars'] || !requirments['at_max_x_chars']) return true;

    const keys: String[] = _.keys(this.passwordRule);

    for (let i = 0; i < keys.length; i++) {
      const k: string = String(keys[i]);
      if (this.passwordRule[k] && !requirments[k]) {
        return true;
      }
    }
    return false;
  }

}
