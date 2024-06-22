import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { AuthService } from '../../shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-event',
  templateUrl: './createevent.component.html',
  styleUrls: ['./createevent.component.scss']
})
export class CreateEventComponent implements OnInit {
  eventForm: UntypedFormGroup;
  eventFormSubmitted = false;
  isCreateFailed = false;

  constructor(
    private router: Router,
    private eventService: EventService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/pages/login']);
    } else {
      const token = localStorage.getItem('token');
      console.log("token access from event", token);
    }

    this.eventForm = new UntypedFormGroup({
      title: new UntypedFormControl('', Validators.required),
      description: new UntypedFormControl('', Validators.required),
      startDate: new UntypedFormControl('', Validators.required),
      startTime: new UntypedFormControl('', Validators.required),
      endDate: new UntypedFormControl('', Validators.required),
      endTime: new UntypedFormControl('', Validators.required),
      location: new UntypedFormControl('', Validators.required),
      maxAttendees: new UntypedFormControl('', [Validators.required, Validators.min(1)])
    });
  }

  get ef() {
    return this.eventForm.controls;
  }

  onSubmit() {
    this.eventFormSubmitted = true;
    this.isCreateFailed = false;

    if (this.eventForm.invalid) {
      return;
    }

    this.spinner.show();

    const newEvent = {
      title: this.ef.title.value,
      description: this.ef.description.value,
      startTime: `${this.ef.startDate.value}T${this.ef.startTime.value}`,
      endTime: `${this.ef.endDate.value}T${this.ef.endTime.value}`,
      location: this.ef.location.value,
      maxAttendees: this.ef.maxAttendees.value
    };

    this.eventService.createEvent(newEvent).subscribe(
      response => {
        this.spinner.hide();
        console.log('Event created successfully', response);
        // Navigate to another page or display a success message
      },
	  error => {
		this.spinner.hide();
		this.isCreateFailed = true;
		console.error('Error creating event', error);
		// Log the error details for debugging
		if (error instanceof HttpErrorResponse) {
		  console.error(`Status: ${error.status}, ${error.statusText}`);
		  console.error('Response body:', error.error);
		}
	  }
    );
  }
}
