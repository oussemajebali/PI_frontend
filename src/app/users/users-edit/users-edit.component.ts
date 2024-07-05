import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "../user.service";
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss',
    '../../../assets/sass/pages/page-users.scss',
    '../../../assets/sass/libs/select.scss'],
})
export class UsersEditComponent implements OnInit {

  user: any = {};
  userForm: FormGroup | null = null;
  userFormSubmitted = false;
  isCreateFailed = false;
  avatarFile: File | null = null;
  avatarPreview: string = 'assets/img/portrait/small/avatar-s-2.png';

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('id');
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.user) {
      this.user = navigation.extras.state.user;
      this.avatarPreview = this.user.avatar;
      this.initializeForm();
    } else {
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
        this.avatarPreview = this.user.avatar;
        this.initializeForm();
      });
    }
  }

  initializeForm() {
    this.userForm = this.fb.group({
      name: [this.user.name, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      age: [this.user.age, [Validators.required, Validators.min(10)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [this.user.role, Validators.required]
    });
  }

  get uf() {
    return this.userForm?.controls;
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

    if (this.userForm?.invalid) {
      return;
    }

    this.spinner.show();

    const updatedUser = {
      ...this.user,
      name: this.uf?.name.value,
      lastName: this.uf?.lastName.value,
      age: this.uf?.age.value,
      email: this.uf?.email.value,
      role: this.uf?.role.value,
      avatar: this.avatarFile
    };

    this.userService.updateUser(this.user.userId, updatedUser).subscribe(
      () => {
        this.spinner.hide();
        this.router.navigate(['/users/list']);
      },
      error => {
        this.spinner.hide();
        console.error('Error updating user', error);
        this.isCreateFailed = true;
      }
    );
  }
}
