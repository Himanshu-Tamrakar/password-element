export interface _PRule {
  at_least_x_chars: number;
  at_max_x_chars: number;
  at_least_one_lower_case_char: boolean;
  at_least_one_upper_case_char:boolean;
  at_least_one_digit_char: boolean;
  at_least_one_special_char:boolean;
}

export interface _Requirements {
  at_least_x_chars: boolean;
  at_max_x_chars: boolean;
  at_least_one_lower_case_char: boolean;
  at_least_one_upper_case_char: boolean;
  at_least_one_digit_char: boolean;
  at_least_one_special_char: boolean;
  password: string;
}
