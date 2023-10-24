import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CalendarEvent } from './models/CalendarEvent';
import { CalendarUser } from './models/CalendarUser';

@Injectable({
  providedIn: 'root',
})
export class MockDataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    let calendarEvents:CalendarEvent[] = [];
    let calandarUsers:CalendarUser[]=[];
    let basedate=new Date('2023-10-30 15:00');

    for (let id = 0; id < 30; id++) {
      basedate = new Date(basedate.getTime() + (1000 * 60 * 60 * 24));
      let calendarEvent={
        id:id,
        name:'Spieltermin'+id,
        dateTime:basedate
      }
      calendarEvents.push(calendarEvent);
    }
  
    for (let id = 0; id < 30; id++) {
    
      let calendarUser={
        id:id,
        name:'User'+id,      
      }
      calandarUsers.push(calendarUser);
    }

    return { calendarEvents ,calandarUsers};
  }

}