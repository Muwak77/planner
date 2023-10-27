import { Component,OnInit,Input } from '@angular/core';
import { CalendarEvent } from '../models/CalendarEvent';
import { CalendarUser } from '../models/CalendarUser';
import { CalendarDataService } from '../calendar-data.service';
import { ReplyType } from '../models/ReplyType';
import { repeatWhen } from 'rxjs';
@Component({
  selector: 'app-replytoevent',
  templateUrl: './replytoevent.component.html',
  styleUrls: ['./replytoevent.component.css']
})
export class ReplytoeventComponent implements OnInit{
  @Input () calendarEvent:CalendarEvent={id:0,name:"",dateTime:new Date(),replys:[]};  
  currentUser:CalendarUser={id:0,name:"",password:"",admin:false};
  currentState="";


  constructor(private calendarDataService:CalendarDataService ) {}
  
  sayYes() {  
    this.setMyState(ReplyType.yes);    
  }

  sayNo() {    
    this.setMyState(ReplyType.no);
  }

  sayMaybe() {
    this.setMyState(ReplyType.maybe);
  }

  getMyState():string {

    let myReply = this.calendarEvent.replys.find(item => item.user === this.currentUser?.id);
    
    //No reply yet?
    if(myReply===undefined) {
      myReply={user:this.currentUser.id,reply:ReplyType.maybe}
      this.calendarEvent.replys.push(myReply);
    }
    return(myReply.reply)
    
  }

  setMyState(newState:ReplyType) {
    this.calendarEvent.replys = this.calendarEvent.replys.map(item => {
      if (this.currentUser.id === item.user) {
        return { ...item, reply: newState };
      }
      return item;
    });

    this.currentState=this.getMyState();
    this.calendarDataService.updateEvent(this.calendarEvent).subscribe(next=>{      
      
    });

  }

  ngOnInit(): void {
    this.calendarDataService.getCurrentUser().subscribe(user=>(this.currentUser=user));
    this.currentState=this.getMyState();
  }

}
