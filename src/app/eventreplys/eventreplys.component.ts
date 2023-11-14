import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent } from '../models/CalendarEvent';
import { CalendarDataService } from '../calendar-data.service';
import { CalendarUser } from '../models/CalendarUser';

@Component({
  selector: 'app-eventreplys',
  templateUrl: './eventreplys.component.html',
  styleUrls: ['./eventreplys.component.css'],
})
export class EventreplysComponent implements OnInit {
  @Input() calendarEvent?: CalendarEvent;
  calendarUsers?: CalendarUser[];
  constructor(private calendarDataService: CalendarDataService) {}

  getUsers(): void {
    this.calendarDataService
      .getUsers()
      .subscribe((calendarUsers) => (this.calendarUsers = calendarUsers));
  }
  ngOnInit(): void {
    this.getUsers()
  }


}
