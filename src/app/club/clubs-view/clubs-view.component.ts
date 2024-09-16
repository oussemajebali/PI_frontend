import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubService } from '../clubs.service';
import { AuthService } from '../../shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';
@Component({
  selector: 'app-clubs-view',
  templateUrl: './clubs-view.component.html',
  styleUrls: ['./clubs-view.component.scss', '../../../assets/sass/pages/page-users.scss']
})
export class ClubsViewComponent {
  club: any = {
    name: '',
    description: '',
    leader: localStorage.getItem('user_id'),
    status: 'PENDING' // Initial status is pending
  };

  constructor(private clubService: ClubService, private router: Router, private modalService: NgbModal) { }

  createClub() {
    this.clubService.createClub(this.club).subscribe({
      next: (response: any) => {
        this.openModal('Club successfully created!', 'Success');
        console.log("club created : ",response );
        this.router.navigate(['/clubs/list']);
      },
      error: (error: any) => {
        this.openModal('Error creating club. Please try again.', 'Error');
      }
    });
  }

  openModal(message: string, title: string) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
  }
}
