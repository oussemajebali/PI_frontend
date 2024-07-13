import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../event/event.service';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  currentRate = 8;
  currentRating = 6;
  selected = 0;
  hovered = 0;
  readonly = false;
  decimalCurrentRate = 3.14;
  participatedEvents: any[] = [];

  ctrl = new UntypedFormControl(null, Validators.required);

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.fetchParticipatedEvents();
  }

  fetchParticipatedEvents() {
    const userName = localStorage.getItem('user_email');  // Adjust this as needed to get the current user's email or username
    this.eventService.getParticipatedEvents(userName).subscribe(events => {
      this.participatedEvents = events;
      console.log('participated events :' ,  this.participatedEvents);
    });
  }

  rateEvent(event: any, rating: number) {
    const userId = localStorage.getItem('user_id');
    console.log('Rating event with user ID:', userId);  // Add log to check user ID

    const ratingData = {
      eventId : event.id ,
      userId : Number(userId),  // Ensure this ID is correct and the user exists
      stars: rating
    };
    console.log(ratingData);
    this.eventService.createRating(ratingData).subscribe(response => {
      console.log('Rating submitted', response);
    }, error => {
      console.error('Error submitting rating', error);
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }
}
