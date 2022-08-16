import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

/**
 * Modify the login component and the login template to collect login details and add the validators as necessary
 */


@Component({
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  submitted = false;
  passwordtype;
  show = true;
  eyeIcon = 'assets/eye.svg';
  SlashEyeIcon = 'assets/eye-slash.svg';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // setup the loginform and validators
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      conditioncheck: [false, this.ValidatorCheck()],
    });

    this.loginForm.valueChanges.subscribe((value) => {
      this.errorMessage = '';
      console.log(value, this.loginForm);
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  get conditioncheck() {
    return this.loginForm.get('conditioncheck');
  }

  ValidatorCheck() {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value ? null : { checkRequired: { value: control.value } };
    };
  }

  ngOnDestroy() {}

  onSubmit() {
    //

    this.authenticationService
      .login(this.email.value, this.password.value)
      .subscribe(
        (res) => {
          console.log('Auth resp', res);
          this.router.navigate(['welcome']);
        },
        (error) => {
          this.errorMessage = error.error;
          console.log(error);
        }
      );
  }

  // implement the username validator. Min 6 characters and no digits, special chars
  usernameValidator() {
    return false;
  }

  // implement the password validator
  // Min 1 uppercase, 1 lower case and a digit. Total length >= 8
  passwordValidator() {
    return false;
  }
}

