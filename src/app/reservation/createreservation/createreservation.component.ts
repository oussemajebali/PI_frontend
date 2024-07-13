import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { SpaceService } from '../../space/space.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createreservation',
  templateUrl: './createreservation.component.html',
  styleUrls: ['./createreservation.component.scss']
})
export class CreatereservationComponent implements OnInit {
  reservation = {
    userId: '',
    startDate: '',
    endDate: '',
    space: null
  };

  spaces: any[] = [];
  isCreateFailed = false;

  constructor(
    private reservationService: ReservationService,
    private spaceService: SpaceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.reservation.userId = localStorage.getItem('user_id') || 'default_user_id';

    this.spaceService.getAllSpaces().subscribe(
      data => {
        this.spaces = data;
      },
      error => {
        console.error('Error fetching spaces:', error);
      }
    );
  }

  createReservation() {
    try {
      if (!this.reservation.space || !this.reservation.space.id) {
        throw new Error('Space must be selected');
      }

      const reservationData = {
        userId: this.reservation.userId,
        startDate: this.reservation.startDate,
        endDate: this.reservation.endDate,
        spaceId: this.reservation.space.id // Ensure spaceId is sent
      };

      this.reservationService.createReservation(reservationData).subscribe(
        () => {
          this.router.navigate(['/reservations/ReservationList']);
        },
        error => {
          console.error('Error creating reservation:', error);
          this.isCreateFailed = true;
        }
      );
    } catch (error) {
      console.error('Error processing reservation data:', error);
      this.isCreateFailed = true;
    }
  }

  onCancel() {
    this.router.navigate(['/reservations/ReservationList']);
  }

}
