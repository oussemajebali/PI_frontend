import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})
export class EventListComponent implements OnInit {
  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.eventService.getAllEvents().subscribe(
      (data: any[]) => {
        this.events = data.sort((a, b) => {
          return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
        });
        console.log('Events fetched successfully', this.events);
      },
      error => {
        console.error('Error fetching events:', error);
        // Handle error
      }
    );
  }

  participate(event: any) {
    console.log('Participating in event:', event);
    this.eventService.createParticipation(event.id).subscribe(
      response => {
        console.log('Successfully participated in event:', response);
        // Handle successful participation, e.g., show a success message
      },
      error => {
        console.error('Error participating in event:', error);
        // Handle error, e.g., show an error message
      }
    );
  }
}
