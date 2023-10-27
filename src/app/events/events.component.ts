import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from '../models/CalendarEvent';
import { CalendarUser } from '../models/CalendarUser';
import { CalendarDataService } from '../calendar-data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit{
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

  addEvent():void {
    this.calendarDataService.addEvent().subscribe(next=>{      
      this.calendarDataService.updateValue("XXX");
    });
  }


  getUpdteChecker():void{
    this.calendarDataService.getValueObservable().subscribe(value => {
      this.getEvents();
    });
  }

  getUsers():void {
    this.calendarDataService.getUsers().subscribe((calendarUsers) => (this.calendarUsers = calendarUsers));
  }

  getEvents():void {
    this.calendarDataService.getEvents().subscribe((calendarEvents) => {
      this.calendarEvents = calendarEvents;

      // Ereignisse nach DateTime in absteigender Reihenfolge sortieren
      this.calendarEvents.sort((a, b) => {
        if(typeof a.dateTime === "string") {
          a.dateTime = new Date(a.dateTime);
        }
        
        if(typeof b.dateTime === "string") {
          b.dateTime = new Date(b.dateTime);
        }
        
        return b.dateTime.getTime() - a.dateTime.getTime()
      });
    });

  }

}
