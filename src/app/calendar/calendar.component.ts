import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, endOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { EventService } from '../event/event.service';
 
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
 
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarsComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
 
  view: string = 'month';
  newEvent: CalendarEvent;
  viewDate: Date = new Date();
  modalData: { action: string; event: CalendarEvent };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edit this event', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // Delete the event from the backend
        this.calendarService.deleteEvent(Number(event.id)).subscribe(
          () => {
            // Remove the event from the calendar
            this.events = this.events.filter(iEvent => iEvent !== event);
            this.handleEvent('This event is deleted!', event);
            console.error('deleting event:', event);
          },
          error => {
            console.error('Error deleting event:', error);
          }
        );
      }
    }
  ];
 
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
 
  constructor(private modal: NgbModal, private calendarService: EventService) {}
 
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
          color: colors.blue, // Default color, you can customize this
          actions: this.actions,
          id: event.id,
          description: event.description,
          location: event.location,
          maxAttendees: event.maxAttendees,
        }));
        console.log('events in calendar : ', this.events);
        this.refresh.next();
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }
 
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
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
    this.newEvent = {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      actions: this.actions,
      color: colors.red // Default color for new event
    };
    this.events.push(this.newEvent);
    this.handleEvent('Add new event', this.newEvent);
    this.refresh.next();
  }
}