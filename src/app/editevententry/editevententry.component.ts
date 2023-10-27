import { Component, Input } from '@angular/core';
import { CalendarEvent } from '../models/CalendarEvent';
import { CalendarDataService } from '../calendar-data.service';

@Component({
  selector: 'app-editevententry',
  templateUrl: './editevententry.component.html',
  styleUrls: ['./editevententry.component.css'],
})
export class EditevententryComponent {
  constructor(private calendarDataService: CalendarDataService) {}
  @Input () calendarEvents:CalendarEvent[]=[];
  @Input() calendarEvent: CalendarEvent = {
    id: 0,
    name: '',
    dateTime: new Date('1970-01-01'),
    replys:[]
  };

  delete(calendarEvent: CalendarEvent): void {
    console.log(this.calendarEvents);
    this.calendarEvents = this.calendarEvents.filter((h) => h !== calendarEvent);
    console.log(this.calendarEvent);
    
    this.calendarDataService.deleteEvent(this.calendarEvent.id).subscribe(next=>{      
      this.calendarDataService.updateValue("XXX");
    });
  }

  update(calendarEvent:CalendarEvent):void {
    console.log(calendarEvent)
    this.calendarDataService.updateEvent(calendarEvent).subscribe(next=>{      
      this.calendarDataService.updateValue("XXX");
    });
  }
}
