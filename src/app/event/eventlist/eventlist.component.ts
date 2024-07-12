import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ParticipationService } from '../participation.service';
import { UserService } from '../../users/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private userService: UserService,
    private modal: NgbModal
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
        }).sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
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

    // Check if max attendees limit is reached
    if (event.participations.length >= event.maxAttendees) {
      alert('Sorry, the maximum number of attendees for this event has been reached.');
      return;
    }

    const participationData = {
      userName: userName,
      participationTime: new Date().toISOString(),
      event: { id: event.id } // Send only the event ID
    };

    this.participationService.createParticipation(participationData).subscribe(
      (response) => {
        console.log('Participation created successfully:', response);
        // Update the event object in the events array to reflect the new participation
        const updatedEvent = { ...event };
        updatedEvent.maxAttendees--; // Decrease maxAttendees locally
        updatedEvent.participations.push(response); // Assuming response contains the created participation object
        this.events = this.events.map(e => e.id === event.id ? updatedEvent : e);
        alert('You have successfully participated in the event!');
      },
      (error) => {
        console.error('Error participating in event:', error);
        alert('Failed to participate in the event. Please try again.');
      }
    );
  }

}
