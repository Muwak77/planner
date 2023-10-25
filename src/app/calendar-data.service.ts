import { Injectable } from '@angular/core';
import { CalendarEvent } from './models/CalendarEvent';
import { CalendarUser } from './models/CalendarUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of ,BehaviorSubject} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class CalendarDataService {
  
  eventUrl:string='/echo/events';
  userUrl:string='/echo/users';
  
  //#region updateChecker
  private updateChecker = new BehaviorSubject<string>('Initialer Wert');

  updateValue(newValue: string) {
    this.updateChecker.next(newValue);
  }
  
  getValueObservable(): Observable<string> {
    return this.updateChecker.asObservable();
  }
  //#endregion

  constructor(private http: HttpClient) {}

  getUsers(): Observable<CalendarUser[]> {
    return this.http.get<CalendarUser[]>(`${this.userUrl}`);
  }
  
  getEvents(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(`${this.eventUrl}`);
  }

  deleteEvent(id: number): Observable<CalendarEvent> {
    const url = `${this.eventUrl}?id=${id}`;

    return this.http.delete<CalendarEvent>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted event id=${id}: ${url}`)),
      catchError(this.handleError<CalendarEvent>('deleteEvent')),      
    );
    
  }

  updateEvent(event:CalendarEvent):Observable<CalendarEvent> {
    const url = `${this.eventUrl}?id=${event.id}`;
    
    console.log("EVENT:");
    console.log(event);
    return this.http.put<CalendarEvent>(url, event,this.httpOptions).pipe(
      tap((_) => this.log(`deleted event id=${event.id}: ${url}`)),
      catchError(this.handleError<CalendarEvent>('deleteEvent')),      
    );
  }

  getEvent(id: number): Observable<CalendarEvent> {
    const url = `${this.eventUrl}/${id}`;

    return this.http
      .get<CalendarEvent>(url)
      .pipe(
        tap(
          (value) => this.log(`fetched hero id=${id}, name=${value.name}`),
          catchError(this.handleError<CalendarEvent>(`getHero id=${id}`))
        )
      );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`$(operation) failed $(error.message)`);
      return of(result as T);
    };
  }

  log(message: string) {
    console.log(`${message}`);
  }
}
