import { Component, OnInit } from '@angular/core';
import { ClubService } from '../club.service';
import { Club } from '../club.model'; // Ensure this path is correct

@Component({
  selector: 'app-club-list',
  templateUrl: './clublist.component.html',
  styleUrls: ['./clublist.component.scss']
})
export class ClubListComponent implements OnInit {
  clubs: Club[] = []; // Use the Club model for type safety

  constructor(
    private clubService: ClubService
  ) {}

  ngOnInit() {
    this.fetchClubs();
  }

  fetchClubs() {
    this.clubService.getClubs().subscribe(
      (data: Club[]) => {
        console.log('Clubs fetched successfully', data);
        this.clubs = data;
      },
      error => {
        console.error('Error fetching clubs:', error);
        // Handle error
      }
    );
  }

  participate(club: Club) {
    // Implement the participate logic if needed
    console.log(`Participate in club: ${club.name}`);
  }
}
