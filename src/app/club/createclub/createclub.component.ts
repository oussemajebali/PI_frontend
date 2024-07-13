import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Club } from '../club.model'; // Ensure this path is correct

@Component({
  selector: 'app-create-club',
  templateUrl: './createclub.component.html',
  styleUrls: ['./createclub.component.scss']
})
export class CreateClubComponent {
  clubForm: FormGroup;
  isCreateFailed: boolean = false;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.clubForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.clubForm.invalid) {
      return;
    }

    const url = 'http://localhost:8080/api/v1/clubs/addclub';

    // Retrieve the token from localStorage
    const token = localStorage.getItem('access_token'); 
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(url, this.clubForm.value, { headers }).subscribe({
      next: (response) => {
        console.log('Club created successfully:', response);
        this.router.navigate(['/clubs']); // Navigate to the clubs list or any other page
      },
      error: (error) => {
        console.error('Error creating club:', error);
        this.isCreateFailed = true;
      }
    });
  }
}
