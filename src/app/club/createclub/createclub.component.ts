import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubService } from '../club.service';
import { AuthService } from '../../shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { Club } from '../club.model'; // Ensure this path is correct

@Component({
  selector: 'app-create-club',
  templateUrl: './createclub.component.html',
  styleUrls: ['./createclub.component.scss']
})
export class CreateClubComponent implements OnInit {
  clubForm: FormGroup;
  isCreateFailed = false;

  constructor(
    private router: Router,
    private clubService: ClubService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/pages/login']);
    }

    this.clubForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  get cf() {
    return this.clubForm.controls;
  }

  onSubmit() {
    if (this.clubForm.invalid) {
      return;
    }

    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8',
      color: '#fff',
      fullScreen: true
    });

    const newClub: Club = {
      name: this.cf.name.value,
      description: this.cf.description.value
      // You can include other fields if needed
    };

    this.clubService.createClub(newClub).subscribe(
      response => {
        console.log('Club created successfully:', response);
        this.isCreateFailed = false;
        alert('Club created successfully!');
        this.clubForm.reset();
      },
      error => {
        console.error('Error creating club:', error);
        this.isCreateFailed = true;
        alert('Error creating club. Please try again.');
      }
    );
  }
}
