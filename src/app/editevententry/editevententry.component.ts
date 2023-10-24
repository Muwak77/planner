import { Component, Input } from '@angular/core';
import { CalendarEvent } from '../models/CalendarEvent';
import { CalendarDataService } from '../calendar-data.service';

@Component({
  selector: 'app-editevententry',
  templateUrl: './editevententry.component.html',
  styleUrls: ['./editevententry.component.css']
})
export class EditevententryComponent {

  constructor(private calendarDataService:CalendarDataService) {

  }
  @Input () calendarEvent:CalendarEvent= {
    id:0,
    name:'',
    dateTime:new Date("1970-01-01")
  }

  delete(calendarEvent: CalendarEvent): void {  
    this.calendarDataService.deleteEvent(this.calendarEvent.id).subscribe();
  }
}
