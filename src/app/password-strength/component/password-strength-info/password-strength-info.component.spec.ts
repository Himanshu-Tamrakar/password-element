import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordStrengthInfoComponent } from './password-strength-info.component';

describe('PasswordStrengthInfoComponent', () => {
  let component: PasswordStrengthInfoComponent;
  let fixture: ComponentFixture<PasswordStrengthInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordStrengthInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStrengthInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
