import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  eventForm: FormGroup;
  eventFormSubmitted = false;
  isCreateFailed = false;
  selectedFiles: File[] = [];
  maxSize: number = 10 * 1024 * 1024; // 10 MB
 
  constructor(
    private router: Router,
    private eventService: EventService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}
 
  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/pages/login']);
    }
 
    this.eventForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      maxAttendees: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }
 
  get ef() {
    return this.eventForm.controls;
  }
 
  onFileChange(event: any) {
    if (event.target.files) {
      this.selectedFiles = Array.from(event.target.files as FileList).filter(file => file.size <= this.maxSize) as File[];
 
      if (this.selectedFiles.length !== event.target.files.length) {
        alert('Some files exceed the 10 MB size limit and will not be uploaded.');
      }
    }
  }
 
  onSubmit() {
    this.eventFormSubmitted = true;
    this.isCreateFailed = false;
 
    if (this.eventForm.invalid) {
      return;
    }
 
    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8',
      color: '#fff',
      fullScreen: true
    });
 
    const newEvent = {
      title: this.ef.title.value,
      description: this.ef.description.value,
      startTime: `${this.ef.startDate.value}T${this.ef.startTime.value}`,
      endTime: `${this.ef.endDate.value}T${this.ef.endTime.value}`,
      location: this.ef.location.value,
      maxAttendees: this.ef.maxAttendees.value
    };
    const formData = new FormData();
    formData.append('event', new Blob([JSON.stringify(newEvent)], {
      type: 'application/json'
    }));
 
    this.selectedFiles.forEach(file => {
      formData.append('images', file, file.name);
    });
 
    this.eventService.createEvent(formData).subscribe(
      (response) => {
        console.log('Event created successfully:', response);
        this.isCreateFailed = false;
        // Show success message (you can use a toast or modal for better UX)
        alert('Event created successfully!');
        // Optionally, reset the form after successful submission
        this.eventForm.reset();
      },
      (error) => {
        console.error('Error creating event:', error);
        this.isCreateFailed = true;
        // Show error message (you can use a toast or modal for better UX)
        alert('Error creating event. Please try again.');
      }
    );
  }
}