import { Component, Input,OnInit } from '@angular/core';
import { CalendarEvent } from '../models/CalendarEvent';
import { CalendarUser } from '../models/CalendarUser';
import { CalendarDataService } from '../calendar-data.service';

@Component({
  selector: 'app-evententry',
  templateUrl: './evententry.component.html',
  styleUrls: ['./evententry.component.css']
})
export class EvententryComponent implements OnInit {

  constructor(private calendarDataService:CalendarDataService) {}
  currentUser?:CalendarUser
  ngOnInit(): void {  
    this.calendarDataService.getCurrentUser().subscribe(user=>(this.currentUser=user));
  }
  editMode=false;
  @Input () calendarEvents:CalendarEvent[]=[];
  @Input () calendarEvent:CalendarEvent= {
    id:0,
    name:'',
    dateTime:new Date("1971-01-01 15:30"),
    replys:[]    
    
  }

  toggleEdit() {
    this.editMode=!this.editMode;
  }
}
