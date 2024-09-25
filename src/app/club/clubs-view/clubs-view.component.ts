import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubService } from '../clubs.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-clubs-view',
  templateUrl: './clubs-view.component.html',
  styleUrls: ['./clubs-view.component.scss', '../../../assets/sass/pages/page-users.scss']
})
export class ClubsViewComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  clubForm: UntypedFormGroup;
  logoFile: File | null = null;
  logoPreview: string = 'assets/img/portrait/small/avatar-s-2.png';

  constructor(
    private router: Router,
    private clubService: ClubService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    const leaderId = localStorage.getItem('user_id') || ''; // Get the leader ID from localStorage

    this.clubForm = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      description: new UntypedFormControl('', Validators.required),
      leader: new UntypedFormControl({ value: leaderId, disabled: true }, Validators.required) // Pre-fill and disable leader field
    });
    console.log(this.clubForm);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.logoFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => this.logoPreview = e.target.result;
      reader.readAsDataURL(this.logoFile);
    }
  }

  resetLogo() {
    this.logoFile = null;
    this.logoPreview = 'assets/img/placeholder-logo.png';
    this.fileInput.nativeElement.value = '';
  }

  onSubmit() {
    if (this.clubForm.invalid) {
      return;
    }

    this.spinner.show();

    const newClub = {
      name: this.clubForm.get('name').value,
      description: this.clubForm.get('description').value,
      leader: localStorage.getItem('user_id'), // Use the logged-in user ID from localStorage
      logo: this.logoFile // Attach the logo file
    };

    this.clubService.createClub(newClub).subscribe(
      response => {
        this.spinner.hide();
        console.log('Club created successfully', response);
        alert('Club created successfully');
        this.clubForm.reset();
        this.resetLogo();
      },
      error => {
        this.spinner.hide();
        console.error('Error creating club', error);
        alert('Error creating club');
        if (error instanceof HttpErrorResponse) {
          console.error(`Status: ${error.status}, ${error.statusText}`);
          console.error('Response body:', error.error);
        }
      }
    );
  }
}
