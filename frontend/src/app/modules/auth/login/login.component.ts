import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/shared/services/authServices/authService.service';
import { SnackbarServices } from 'src/app/shared/services/snackbar/snackbar.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// // Custom email validator function
// export function emailFormatValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailPattern.test(control.value)) {
//       return { emailFormat: true };
//     }
//     return null;
//   };
// }

// // Custom email validator function with .in and .com
export function emailFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:in|com)$/;

    if (!emailPattern.test(control.value)) {
      return { emailFormat: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide: boolean = true;
  @ViewChild('signInNgForm')
  signInNgForm!: NgForm;

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
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required,emailFormatValidator()])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.loginForm.disable();
      let formValues = this.loginForm.value;
      let params = {
        email: formValues.email,
        password: formValues.password,
      };

      this._authService
        .login(params)
        .pipe(first())
        .subscribe({
          next: (resp: any) => {
            if (resp != null || resp.length > 0) {
              this.snackbarService.successSnack('Welcome    ' + resp.username);
              this.router.navigate(['/main/home']);
            } else {
              this.snackbarService.errorsSnack('No Response');
            }
          },
          error: (error) => {
            this.loginForm.enable();
            // Reset the form
            this.signInNgForm.resetForm();
            // this.snackBarService.warningSnack('Wrong email or password');
            this.snackbarService.errorsSnack("Bad Credentials");
          },
        });
    } else {
      this.snackbarService.errorsSnack(
        'Invalid form / Please fill required fields'
      );
    }
  }
}
