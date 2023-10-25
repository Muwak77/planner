import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from '../models/CalendarEvent';
import { CalendarUser } from '../models/CalendarUser';
import { CalendarDataService } from '../calendar-data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent {
  constructor(private calendarDataService:CalendarDataService) {}

  calendarUsers: CalendarUser[] = [];
  calendarEvents: CalendarEvent[] = [];  

  //Check for privileges
  CanReply = true;
  CanEdit = true;

  ngOnInit() {
    this.getUsers();
    this.getEvents();
    this.getUpdteChecker();
    
  }

  getUpdteChecker():void{
    this.calendarDataService.getValueObservable().subscribe(value => {
      console.log('Neuer Wert:', value);
      this.getEvents();
    });
  }

  getUsers():void {
    this.calendarDataService.getUsers().subscribe((calendarUsers) => (this.calendarUsers = calendarUsers));
  }

  getEvents():void {
    this.calendarDataService.getEvents().subscribe((calendarEvents) => (this.calendarEvents = calendarEvents));
  }

}
