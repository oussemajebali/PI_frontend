import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClubService } from 'app/club/clubs.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  clubs: any[] = []; // Initialize as an empty array
  joinForm = {
    name: '',
    position: '',
    reason: ''
  };

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit(): void {
    this.clubService.getAllClubs().subscribe(
      (data) => {
        console.log('Clubs data:', data);
        this.clubs = data;
      },
      (error) => {
        console.error('Error loading clubs:', error);
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/pages/login']);
  }

  onJoinClub(club: any, event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get existing requests from localStorage or initialize an empty array
    const existingRequests = JSON.parse(localStorage.getItem('clubJoinRequests') || '[]');
    
      // Check if there are existing requests, and calculate the new ID
  const newId = existingRequests.length > 0 
  ? Math.max(...existingRequests.map((request: any) => request.id || 0)) + 1 
  : 1; // If no existing requests, start with ID 1

    // Create the new join data with the auto-incremented ID
    const joinData = {
      id: newId, // Add the auto-incremented ID
      name: this.joinForm.name,
      position: this.joinForm.position,
      reason: this.joinForm.reason,
      clubId: club.id // Include the club ID to associate the join request with a specific club
    };

    // Add the new request to the array
    existingRequests.push(joinData);

    // Save the updated array back to localStorage
    localStorage.setItem('clubJoinRequests', JSON.stringify(existingRequests));

    // Optionally, reset the form and display a success message
    this.joinForm = { name: '', position: '', reason: '' };
    alert('Your request has been saved. The club leader will review.');
  }
}
