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
        this.events = data;
        console.log('Events fetched successfully', this.events);
      },
      error => {
        console.error('Error fetching events:', error);
        // Handle error
      }
    );
  }
}
