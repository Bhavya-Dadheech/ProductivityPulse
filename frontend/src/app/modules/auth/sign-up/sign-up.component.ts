import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/authServices/authService.service';
import { SnackbarServices } from 'src/app/shared/services/snackbar/snackbar.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom email validator function
export function emailFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:in|com)$/;

    if (!emailPattern.test(control.value)) {
      return { emailFormat: true };
    }

    return null;
  };
}

// Custom username validator function
export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const usernamePattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]*$/;

    if (!usernamePattern.test(control.value)) {
      return { invalidUsername: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  hide: boolean = true;
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarServices,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.intializer();
  }

  intializer() {
    this.signupForm = this.fb.group({
      username: [
        '',
        Validators.compose([Validators.required, usernameValidator()]),
      ],
      email: [
        '',
        Validators.compose([Validators.required, emailFormatValidator()]),
      ],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  submit() {
    if (this.signupForm.valid) {
      this.signupForm.disable();
      let formValues = this.signupForm.value;
      let params = {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      };

      this._authService.signUp(params).subscribe(
        (resp: any) => {
          this.snackbarService.successSnack(resp);
          this.router.navigate(['/login']);
        },
        (error: any) => {
          this.signupForm.enable();
          this.signupForm.reset();
          this.snackbarService.errorsSnack(error);
        }
      );
    } else {
      this.snackbarService.errorsSnack(
        'Invalid form / Please fill required fields'
      );
    }
  }
}
