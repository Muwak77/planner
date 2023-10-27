import { Component } from '@angular/core';
import { CalendarDataService } from './calendar-data.service';
import { OnInit } from '@angular/core';
import { CalendarUser } from './models/CalendarUser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  constructor(private calendarDataService:CalendarDataService){}

  title = 'planner';
  user:CalendarUser={id:0,name:"",password:"",admin:false};
  

  ngOnInit(): void {  
    this.calendarDataService.getCurrentUser().subscribe(user=>(this.user=user));
  }

  logout():void {
    this.calendarDataService.logout();
  }
}
