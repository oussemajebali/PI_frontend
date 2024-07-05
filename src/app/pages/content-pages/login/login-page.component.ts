import { Component, ViewChild, TemplateRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  @ViewChild('notAdminModal') notAdminModal!: TemplateRef<any>;

  loginFormSubmitted = false;
  isLoginFailed = false;
  role: string = '';

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('student@esprit.tn', [Validators.required, Validators.email]),
    password: new UntypedFormControl('Password', [Validators.required]),
    rememberMe: new UntypedFormControl(true)
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  get lf() {
    return this.loginForm.controls;
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
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
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('user_id', response.user_id);

        if (response.role !== 'UNIVERSITY_ADMIN' && response.role !== 'CLUB_LEADER') {
          this.role = response.role;
          this.open(this.notAdminModal);
          console.log("dkhal");
        } else {
          this.router.navigate(['/dashboard/dashboard1']);
        }
      },
      error => {
        this.spinner.hide();
        this.isLoginFailed = true;
        console.error('Login failed', error);
      }
    );
  }
}
