import { Component ,OnInit } from '@angular/core';
import { CalendarDataService } from '../calendar-data.service';
import { CalendarUser } from '../models/CalendarUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit{
  
  constructor(private calendarDataService:CalendarDataService){}
  
  calendarUsers?: CalendarUser[] ;
  username:string="";
  password:string="";
  
  ngOnInit(): void {
    this.getUsers();    
  }
  
  getUsers():void {
    this.calendarDataService.getUsers().subscribe((calendarUsers) => (this.calendarUsers = calendarUsers));
  }
  

  checkPassword(): void{
    

    console.log("Logging in"); 
    
    this.calendarUsers?.forEach((x)=>{
      if(x.name==this.username && x.password==this.password) {
        this.calendarDataService.setCurrentUser(x);
      }
    })    


  }
 
  
}
