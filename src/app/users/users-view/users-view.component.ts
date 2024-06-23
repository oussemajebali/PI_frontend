import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../../shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss', '../../../assets/sass/pages/page-users.scss']
})
export class UsersViewComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  userForm: UntypedFormGroup;
  userFormSubmitted = false;
  isCreateFailed = false;
  avatarFile: File | null = null;
  avatarPreview: string = 'assets/img/portrait/small/avatar-s-2.png';

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/pages/login']);
    } else {
      const token = localStorage.getItem('access_token');
      console.log("Token accessed from user view", token);
    }

    this.userForm = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      lastName: new UntypedFormControl('', Validators.required),
      age: new UntypedFormControl('', [Validators.required, Validators.min(10)]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', Validators.required),
      role: new UntypedFormControl('', Validators.required)
    });
  }

  get uf() {
    return this.userForm.controls;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.avatarFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => this.avatarPreview = e.target.result;
      reader.readAsDataURL(this.avatarFile);
    }
  }

  resetAvatar() {
    this.avatarFile = null;
    this.avatarPreview = 'assets/img/portrait/small/avatar-s-2.png';
    this.fileInput.nativeElement.value = '';
  }

  onSubmit() {
    this.userFormSubmitted = true;
    this.isCreateFailed = false;

    if (this.userForm.invalid) {
      return;
    }

    this.spinner.show();

    const newUser = {
      name: this.uf.name.value,
      lastName: this.uf.lastName.value,
      age: this.uf.age.value,
      email: this.uf.email.value,
      password: this.uf.password.value,
      role: this.uf.role.value,
      avatar: this.avatarFile // Include avatar file
    };

    this.userService.createUser(newUser).subscribe(
      response => {
        this.spinner.hide();
        console.log('User created successfully', response);
        // Navigate to another page or display a success message
      },
      error => {
        this.spinner.hide();
        this.isCreateFailed = true;
        console.error('Error creating user', error);
        // Log the error details for debugging
        if (error instanceof HttpErrorResponse) {
          console.error(`Status: ${error.status}, ${error.statusText}`);
          console.error('Response body:', error.error);
        }
      }
    );
  }
}
