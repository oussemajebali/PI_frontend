import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { SpaceService } from '../space.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

enum SpaceType {
  OUTDOOR_AREA = 'OUTDOOR_AREA',
  EVENT_SPACE = 'EVENT_SPACE',
  CLASSROOM = 'CLASSROOM',
  RECREATIONAL_FACILITY = 'RECREATIONAL_FACILITY',
  CREATIVE_SPACE = 'CREATIVE_SPACE',
  MEETING_ROOM = 'MEETING_ROOM',
  TECHNOLOGY_AND_INNOVATION = 'TECHNOLOGY_AND_INNOVATION',
  LABORATORY = 'LABORATORY',
  STUDY_AREA = 'STUDY_AREA'
}

@Component({
  selector: 'app-createspace',
  templateUrl: './createspace.component.html',
  styleUrls: ['./createspace.component.scss']
})
export class CreatespaceComponent implements OnInit {
  spaceForm: UntypedFormGroup;
  spaceFormSubmitted = false;
  isCreateFailed = false;
  spaceTypes = Object.values(SpaceType);

  constructor(private router: Router, private authService: AuthService, private spaceService: SpaceService, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.spaceForm = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      type: new UntypedFormControl('', Validators.required),
      available: new UntypedFormControl(true, Validators.required),
      photoUrl: new UntypedFormControl('') // Initialize the form control for photoUrl
    });
  }

  get ef() {
    return this.spaceForm.controls;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // Implement the upload logic here. This is just a placeholder.
      this.spaceService.uploadPhoto(formData).subscribe(
        (response: any) => {
          this.ef.photoUrl.setValue(response.fileUrl); // Set the URL of the uploaded photo
          console.log('File uploaded successfully', response);
        },
        error => {
          console.error('Error uploading file', error);
        }
      );
    }
  }

  onSubmit() {
    this.spaceFormSubmitted = true;
    this.isCreateFailed = false;

    if (this.spaceForm.invalid) {
      return;
    }

    this.spinner.show();

    const newSpace = {
      name: this.ef.name.value,
      type: this.ef.type.value,
      available: this.ef.available.value,
      photoUrl: this.ef.photoUrl.value // Ensure this matches your backend field name
    };

    this.spaceService.createSpace(newSpace).subscribe(
      (response: any) => {
        this.spinner.hide();
        console.log('Space created successfully', response);
        // Optionally, navigate to another page or display a success message
      },
      error => {
        this.spinner.hide();
        this.isCreateFailed = true;
        console.error('Error creating space', error);
        // Log the error details for debugging
        if (error instanceof HttpErrorResponse) {
          console.error(`Status: ${error.status}, ${error.statusText}`);
          console.error('Response body:', error.error);
        }
      }
    );
  }

  onCancel(): void {
    this.spaceForm.reset();
  }
}
