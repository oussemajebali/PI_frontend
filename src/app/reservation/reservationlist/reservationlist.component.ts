import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { SpaceService } from '../../space/space.service';



@Component({
  selector: 'app-reservationlist',
  templateUrl: './reservationlist.component.html',
  styleUrls: ['./reservationlist.component.scss']
})
export class ReservationlistComponent implements OnInit {
  allReservations: any[] = [];
  reservations: any[];
  spaces: any[] = [];
  selectedSpaceId: number | null = null;

  constructor(
    private reservationService: ReservationService,
    private spaceService: SpaceService
  ) {}

  ngOnInit() {
    this.loadAllReservations();
    this.loadSpaces();
  }

  loadAllReservations() {
    this.reservationService.getAllReservations().subscribe(
      data => {
        console.log('All Reservations:', data); // Debugging statement
        this.allReservations = data;
        this.reservations = data; // Initialize the displayed reservations
      },
      error => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  loadSpaces() {
    this.spaceService.getAllSpaces().subscribe(
      data => {
        console.log('All Spaces:', data); // Debugging statement
        this.spaces = data;
      },
      error => {
        console.error('Error fetching spaces:', error);
      }
    );
  }

  onSpaceChange(spaceId: string) {
    console.log('Selected Space ID:', spaceId); // Debugging statement
    if (spaceId) {
      this.selectedSpaceId = +spaceId;
      this.reservationService.getReservationsBySpace(this.selectedSpaceId).subscribe(
        data => {
          console.log('Filtered Reservations:', data); // Debugging statement
          this.reservations = data;
        },
        error => {
          console.error('Error fetching reservations by space:', error);
        }
      );
    } else {
      this.selectedSpaceId = null;
      this.reservations = this.allReservations; // Reset to show all reservations
    }
  }

  deleteReservation(id: number) {
    this.reservationService.deleteReservation(id).subscribe(() => {
      this.reservations = this.reservations.filter(r => r.id !== id);
    });
  }

}
