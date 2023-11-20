import { Component, OnInit, Input } from '@angular/core';
import { CalendarDataService } from '../calendar-data.service';
import { CalendarUser } from '../models/CalendarUser';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  @Input() calendarUsers?: CalendarUser[];
  private calendarDataService: CalendarDataService;
  constructor(calendarDataService: CalendarDataService) {
    this.calendarDataService = calendarDataService;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.calendarDataService
      .getUsers()
      .subscribe((calendarUsers) => (this.calendarUsers = calendarUsers));
  }

  delete(calendarUser: CalendarUser): void {
    this.calendarUsers = this.calendarUsers?.filter((h) => h !== calendarUser);
    this.calendarDataService.deleteEvent(calendarUser.id).subscribe((next) => {
      this.calendarDataService.updateValue('XXX');
    });
  }

  update(calendarUser: CalendarUser): void {
    this.calendarDataService.updateUser(calendarUser).subscribe((next) => {
      this.calendarDataService.updateValue('XXX');
    });
  }
}
