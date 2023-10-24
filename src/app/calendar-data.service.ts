import { Injectable } from '@angular/core';
import { CalendarEvent } from './models/CalendarEvent';
import { CalendarUser } from './models/CalendarUser';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CalendarDataService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<CalendarUser[]> {    
     return this.http.get<CalendarUser[]>('api/calendarUsers');
  }

  getEvents():Observable<CalendarEvent[]> {     
     return this.http.get<CalendarEvent[]>('api/calendarEvents');
  }

  deleteEvent(id: number): Observable<CalendarEvent> {
    const url = `api/calendarEvents/${id}`;    
    return this.http.delete<CalendarEvent>(url, this.httpOptions)
  }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };  
}
