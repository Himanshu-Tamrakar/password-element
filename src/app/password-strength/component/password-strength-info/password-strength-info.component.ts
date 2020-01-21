import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _Requirements } from '../../interface/password-rule';

@Component({
  selector: 'app-password-strength-info',
  templateUrl: './password-strength-info.component.html',
  styleUrls: ['./password-strength-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordStrengthInfoComponent implements OnInit {
  @Input('requirments') requirments:_Requirements;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {}

  runChangeDetection() {
   this.cd.detectChanges();
 }

}
