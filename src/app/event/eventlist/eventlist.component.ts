import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ParticipationService } from '../participation.service';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})
export class EventListComponent implements OnInit {
  events: any[] = [];

  constructor(
    private eventService: EventService,
    private participationService: ParticipationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.eventService.getAllEvents().subscribe(
      (data: any[]) => {
        console.log('Events fetched successfully', data);
        this.events = data.map(event => {
          if (event.images && typeof event.images === 'string') {
            event.images = event.images.split(';').filter(url => url.trim().length > 0);
          } else {
            event.images = [];
          }
          return event;
        }).sort((a, b) => {
          return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
        });

        console.log('Events fetched successfully', this.events);
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }

  participate(event: any) {
    const userName = this.userService.getCurrentUserName();
    if (!userName) {
      console.error('Current user name not found in local storage.');
      return;
    }

    if (event.participations.length >= event.maxAttendees) {
      alert('Sorry, the maximum number of attendees for this event has been reached.');
      return;
    }

    const participationData = {
      userName: userName,
      participationTime: new Date().toISOString(),
      event: { id: event.id }
    };

    this.participationService.createParticipation(participationData).subscribe(
      (response) => {
        console.log('Participation created successfully:', response);
        const updatedEvent = { ...event };
        updatedEvent.participations.push(response);
        this.events = this.events.map(e => e.id === event.id ? updatedEvent : e);
        alert('You have successfully participated in the event!');
      },
      (error) => {
        console.error('Error participating in event:', error);
        alert('Failed to participate in the event. Please try again.');
      }
    );
  }
  rateEvent(event: any, stars: number) {
    const userName = this.userService.getCurrentUserName();
    if (!userName) {
      console.error('Current user name not found in local storage.');
      return;
    }
  
    const ratingData = {
      user: { id: '1'  },
      event: { id: event.id },
      stars: stars
    };
  
    this.eventService.createRating(ratingData).subscribe(
      (response) => {
        console.log('Rating created successfully:', response);
        alert('You have successfully rated the event!');
      },
      (error) => {
        console.error('Error rating event:', error);
        alert('Failed to rate the event. Please try again.');
      }
    );
  }
  
}
