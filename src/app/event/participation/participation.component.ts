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
 
}
}