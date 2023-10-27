import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CalendarDataService } from '../calendar-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private calendarDataService:CalendarDataService){}
  username:string="";
  password:string="";


  checkPassword() {
    this.calendarDataService.login(this.username,this.password);
  }
}
