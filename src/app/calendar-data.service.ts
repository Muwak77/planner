import { Injectable } from '@angular/core';
import { CalendarEvent } from './models/CalendarEvent';
import { CalendarUser } from './models/CalendarUser';
import { CalendarGroup } from './models/CalendarGroup';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of ,BehaviorSubject} from 'rxjs';
import { catchError, map, tap,delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class CalendarDataService {
  
  eventUrl:string='/echo/events/';
  userUrl:string='/echo/users/';

  constructor(private http: HttpClient) {}
  
  //#region updateChecker
  private updateChecker = new BehaviorSubject<string>('Initialer Wert');

  updateValue(newValue: string) {
    this.updateChecker.next(newValue);
  }
  
  getValueObservable(): Observable<string> {
    return this.updateChecker.asObservable();
  }
  //#endregion

  private currentUser = new BehaviorSubject<CalendarUser>({id:0,name:"",password:"",admin:false});
  
  
  getCurrentUser():Observable<CalendarUser> {
    return this.currentUser;  
  }

  setCurrentUser(currentUser:CalendarUser) {
      this.currentUser.next(currentUser);
  }

  getUsers(): Observable<CalendarUser[]> {
    const users:CalendarUser[]=[
      {id:1,
      name:"ingo",
      password:"pro1",
      admin:true

      },
      {id:2,
      name:"peter",
      password:"pro1",
      admin:false
      },
    ]
    return of(users);  
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
  getGroups():Observable<CalendarGroup[]> {
    const groups:CalendarGroup[]= [
        {
          id:0,
          name:"DSA-Runde",
          users:[]
        }
    ]
    
    return of(groups).pipe(delay(500));
  }
  

  addEvent(): Observable<CalendarEvent> {
    const url = `${this.eventUrl}`;
    const eventTemplate:CalendarEvent={id:0,name:"",dateTime:new Date(),replys:[]}

    return this.http.post<CalendarEvent>(url,eventTemplate, this.httpOptions).pipe(
      tap((_) => this.log(`new event: ${url}`)),
      catchError(this.handleError<CalendarEvent>('deleteEvent')),      
    );
  }

  updateEvent(event:CalendarEvent):Observable<CalendarEvent> {
    const url = `${this.eventUrl}?id=${event.id}`;
      
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
    //console.log(`${message}`);
  }

  async login(username:string,password:string):Promise<boolean>{
    let result=false;
    const users = await this.getUsers().toPromise();
    users?.forEach((x)=>{
      if(x.name==username && x.password==password) {
        this.setCurrentUser(x);
        result=true;
      }
    })    
    return result;
  }
 
  logout(){
      
    this.setCurrentUser({id:0,name:"",password:"",admin:false});      
    
  }
}
