import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../clubs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clubs-edit',
  templateUrl: './clubs-edit.component.html',
  styleUrls: ['./clubs-edit.component.scss']
})
export class ClubsEditComponent implements OnInit {

  club: any = {};
  clubForm: FormGroup | null = null;
  clubFormSubmitted = false;
  isCreateFailed = false;

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private clubService: ClubService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    const clubId = this.route.snapshot.paramMap.get('id');
    if (clubId) {
      this.clubService.getClubById(+clubId).subscribe(club => {
        this.club = club;
        this.initializeForm();
      }, error => {
        console.error('Error fetching club data:', error);
      });
    } else {
      console.error('Club ID is null or undefined');
    }
  }

  initializeForm() {
    this.clubForm = this.fb.group({
      name: [this.club.name || '', Validators.required],
      description: [this.club.description || '', Validators.required]
    });
  }

  get cf() {
    return this.clubForm ? this.clubForm.controls : null;
  }

  onSubmit() {
    this.clubFormSubmitted = true;
    this.isCreateFailed = false;

    if (this.clubForm?.invalid) {
      return;
    }

    this.spinner.show();

    // Create the updated club object with the leaderId included
    const updatedClub = {
      name: this.cf?.name?.value,
      description: this.cf?.description?.value,
      leader: this.club.leader?.userId // Assuming leader.userId is the ID you need
    };

    this.clubService.updateClub(this.club.id, updatedClub).subscribe(
      () => {
        this.spinner.hide();
        this.openSuccessModal(); // Open success modal
        this.router.navigate(['/clubs/list']); // Redirect to list on success
      },
      (error) => {
        this.spinner.hide();
        console.error('Error updating club', error);
        this.openErrorModal(error.message || 'Unknown error occurred'); // Open error modal
        this.isCreateFailed = true;
      }
    );
  }

  openSuccessModal() {
    const modalRef = this.modalService.open(SuccessModalContentComponent);
    modalRef.componentInstance.message = 'Club updated successfully!';
  }

  openErrorModal(errorMessage: string) {
    const modalRef = this.modalService.open(ErrorModalContentComponent);
    modalRef.componentInstance.errorMessage = errorMessage;
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
      <p>{{ message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="modal.close('Close click')">Close</button>
    </div>
  `
})
export class SuccessModalContentComponent {
  message: string;

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
      <p>Failed to update club. Error details:</p>
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
