import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { CalendarService } from './calendar.service';

import { startOfDay, endOfDay, isSameDay, isSameMonth } from 'date-fns';

const colors: any = {
  red: { primary: '#ad2121', secondary: '#FAE3E3' },
  blue: { primary: '#1e90ff', secondary: '#D1E8FF' },
  yellow: { primary: '#e3bc08', secondary: '#FDF1BA' }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarsComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('deleteModal') deleteModal: TemplateRef<any>;
  @ViewChild('editModal') editModal: TemplateRef<any>;

  view: string = 'month';
  viewDate: Date = new Date();
  modalData: { action: string; event: CalendarEvent };
  editEvent: any;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.editEvent = { ...event };
        this.modal.open(this.editModal, { size: 'lg' });
      }
    },
    {
      label: '<i class="fa fa-fw fa-trash"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.modalData = { action: 'Delete', event };
        this.modal.open(this.deleteModal, { size: 'lg' });
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.calendarService.getAllEvents().subscribe(
      (data: any[]) => {
        this.events = data.map(event => ({
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          title: event.title,
          color: colors.blue,
          actions: this.actions,
          id: event.id,
          description: event.description,
          location: event.location,
          maxAttendees: event.maxAttendees,
          images: event.images ? event.images.split(';').filter((url: string) => url.trim().length > 0) : [] // Ensure images are correctly handled
        }));
        this.refresh.next();
        console.log('Fetched events:', this.events); // Log events to verify
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }
  

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    const newEvent: CalendarEvent = {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      actions: this.actions,
      color: colors.red
    };
    this.events.push(newEvent);
    this.handleEvent('Add new event', newEvent);
    this.refresh.next();
  }

  confirmDelete(): void {
    this.calendarService.deleteEvent(Number(this.modalData.event.id)).subscribe(
      () => {
        this.events = this.events.filter(iEvent => iEvent !== this.modalData.event);
        this.handleEvent('Deleted', this.modalData.event);
        this.modal.dismissAll();
      },
      error => {
        console.error('Error deleting event:', error);
      }
    );
  }

  saveEdit(): void {
    const updatedEvent = {
      id: this.editEvent.id,
      title: this.editEvent.title,
      description: this.editEvent.description,
      startTime: this.editEvent.start.toISOString(),
      endTime: this.editEvent.end.toISOString(),
      location: this.editEvent.location,
      maxAttendees: this.editEvent.maxAttendees,
      images: this.editEvent.images.join(';') // Ensure images are joined as a string
    };
  
    this.calendarService.updateEvent(Number(this.editEvent.id), updatedEvent).subscribe(
      (response) => {
        const index = this.events.findIndex(event => event.id === this.editEvent.id);
        if (index !== -1) {
          this.events[index] = {
            ...this.events[index],
            ...response, // Ensure all updated properties are applied
            start: new Date(response.startTime),
            end: new Date(response.endTime),
            images: response.images ? response.images.split(';').filter((url: string) => url.trim().length > 0) : []
          };
        }
        console.log('Updated event:', this.events[index]);
        this.refresh.next();
        this.modal.dismissAll();
      },
      error => {
        console.error('Error updating event:', error);
      }
    );
  }
  
  
}
