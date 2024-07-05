import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.scss']
})
export class ParticipationComponent implements OnInit {
  eventId: number;
  isParticipating = false;
  participationFailed = false;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventId = +params['id'];
    });
  }

  participate() {
    this.isParticipating = true;
    this.participationFailed = false;

    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8',
      color: '#fff',
      fullScreen: true
    });

    this.eventService.createParticipation(this.eventId).subscribe(
      response => {
        this.spinner.hide();
        console.log('Participation successful', response);
        // Display a success message or navigate to another page
      },
      error => {
        this.spinner.hide();
        this.participationFailed = true;
        console.error('Error participating in event', error);
        if (error instanceof HttpErrorResponse) {
          console.error(`Status: ${error.status}, ${error.statusText}`);
          console.error('Response body:', error.error);
        }
      }
    );
  }
}
