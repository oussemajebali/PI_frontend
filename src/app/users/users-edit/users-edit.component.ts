import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "../user.service";
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private fb: FormBuilder,
    private modalService: NgbModal // Inject NgbModal here
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state?.user) {
        this.user = navigation.extras.state.user;
        this.avatarPreview = this.user.avatar;
        this.initializeForm();
      } else {
        this.userService.getUserById(+userId).subscribe(user => {
          this.user = user;
          this.avatarPreview = this.user.avatar;
          this.initializeForm();
        }, error => {
          console.error('Error fetching user data:', error);
        });
      }
    } else {
      console.error('User ID is null or undefined');
    }
  }
  
  initializeForm() {
    this.userForm = this.fb.group({
      name: [this.user.name || '', Validators.required],
      lastName: [this.user.lastName || '', Validators.required],
      age: [this.user.age || '', [Validators.required, Validators.min(10)]],
      email: [this.user.email || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [this.user.role || '', Validators.required]
    });
  }
  
  get uf() {
    return this.userForm ? this.userForm.controls : null;
  }
  
  onSubmit() {
    this.userFormSubmitted = true;
    this.isCreateFailed = false;
  
    if (this.userForm?.invalid) {
      return;
    }
  
    this.spinner.show();
  
    const oldValues = {
      name: this.user.name,
      lastName: this.user.lastName,
      age: this.user.age,
      email: this.user.email,
      role: this.user.role
    };

    const updatedUser = {
      ...this.user,
      name: this.uf?.name?.value,
      lastName: this.uf?.lastName?.value,
      age: this.uf?.age?.value,
      email: this.uf?.email?.value,
      role: this.uf?.role?.value,
      avatar: this.avatarFile
    };
  
    this.userService.updateUser(this.user.userId, updatedUser).subscribe(
      () => {
        this.spinner.hide();
        this.openSuccessModal(oldValues, updatedUser); // Open success modal
        this.router.navigate(['/users/list']); // Redirect to list on success
      },
      (error: HttpErrorResponse) => {
        this.spinner.hide();
        console.error('Error updating user', error);
        this.openErrorModal(error.message || 'Unknown error occurred'); // Open error modal
        this.isCreateFailed = true;
      }
    );
  }
  
  openSuccessModal(oldValues: any, updatedUser: any) {
    const modalRef = this.modalService.open(SuccessModalContentComponent);
    modalRef.componentInstance.oldValues = oldValues;
    modalRef.componentInstance.updatedUser = updatedUser;
  }
  
  openErrorModal(errorMessage: string) {
    const modalRef = this.modalService.open(ErrorModalContentComponent);
    modalRef.componentInstance.errorMessage = errorMessage;
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
}

@Component({
  selector: 'success-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Update Successful</h4>
      <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Update of the user is done successfully:</p>
      <ul>
        <li>
          <span>{{ oldValues.name }}</span>
          <i class="ft-arrow-right text-success"></i>
          <span>{{ updatedUser.name }}</span>
        </li>
        <li>
          <span>{{ oldValues.lastName }}</span>
          <i class="ft-arrow-right text-success"></i>
          <span>{{ updatedUser.lastName }}</span>
        </li>
        <li>
          <span>{{ oldValues.age }}</span>
          <i class="ft-arrow-right text-success"></i>
          <span>{{ updatedUser.age }}</span>
        </li>
        <li>
          <span>{{ oldValues.email }}</span>
          <i class="ft-arrow-right text-success"></i>
          <span>{{ updatedUser.email }}</span>
        </li>
        <li>
          <span>{{ oldValues.role }}</span>
          <i class="ft-arrow-right text-success"></i>
          <span>{{ updatedUser.role }}</span>
        </li>
      </ul>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="modal.close('Close click')">Close</button>
    </div>
  `
})
export class SuccessModalContentComponent {
  oldValues: any;
  updatedUser: any;

  constructor(public modal: NgbActiveModal) {}
}
@Component({
  selector: 'error-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Update Failed</h4>
      <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Failed to update user. Error details:</p>
      <p>{{ errorMessage }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="modal.close('Close click')">Close</button>
    </div>
  `
})
export class ErrorModalContentComponent {
  errorMessage: string;

  constructor(public modal: NgbActiveModal) {}
}