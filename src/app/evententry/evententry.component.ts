import { Component, Input } from '@angular/core';
import { CalendarEvent } from '../models/CalendarEvent';

@Component({
  selector: 'app-evententry',
  templateUrl: './evententry.component.html',
  styleUrls: ['./evententry.component.css']
})
export class EvententryComponent {
  editMode=false;
  @Input () calendarEvents:CalendarEvent[]=[];
  @Input () calendarEvent:CalendarEvent= {
    id:0,
    name:'',
    dateTime:new Date("1971-01-01 15:30")
    
  }

  toggleEdit() {
    this.editMode=!this.editMode;
  }
}
