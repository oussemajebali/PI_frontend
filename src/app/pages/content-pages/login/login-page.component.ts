import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('student@esprit.tn', [Validators.required, Validators.email]),
    password: new UntypedFormControl('Password', [Validators.required]),
    rememberMe: new UntypedFormControl(true)
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });

    const loginRequest = {
      email: this.lf.email.value,
      password: this.lf.password.value
    };

    this.authService.signinUser(loginRequest).subscribe(
      response => {
        this.spinner.hide();
        // Assuming response contains the token
        localStorage.setItem('token', response.token);
        this.spinner.hide();
       this.router.navigate(['/dashboard/dashboard1']);
       console.log('login successful', response);
      },
      error => {
        this.spinner.hide();
        this.isLoginFailed = true;
        console.error('Login failed', error);
      }
    );
  }
}
