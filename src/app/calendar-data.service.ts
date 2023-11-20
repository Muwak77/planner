import { Injectable ,OnInit} from '@angular/core';
import { CalendarEvent } from './models/CalendarEvent';
import { CalendarUser } from './models/CalendarUser';
import { CalendarGroup } from './models/CalendarGroup';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of ,BehaviorSubject} from 'rxjs';
import { catchError, map, tap,delay } from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})

export class CalendarDataService implements OnInit {


  ngOnInit(): void {
      this.getUsers().subscribe((calendarUsers) =>
      {
      this.users=calendarUsers;
    })
    console.log("initializing user data");
  }
  baseUrl:string ='http://localhost:8081'
  eventUrl:string=this.baseUrl+'/events/';
  userUrl:string=this.baseUrl+ '/users/';

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
 private users?: CalendarUser[]
  
  getCurrentUser():Observable<CalendarUser> {
    return this.currentUser;  
  }

  setCurrentUser(currentUser:CalendarUser) {
      this.currentUser.next(currentUser);
  }

  getUsers(): Observable<CalendarUser[]> {
    console.log("Retrieving users From: "+this.userUrl);
    return this.http.get<CalendarUser[]>(`${this.userUrl}`);     
  }

  updateUser(user:CalendarUser):Observable<CalendarUser> {
    const url = `${this.userUrl}${user.id}`;    
    return this.http.put<CalendarUser>(url, user,this.httpOptions).pipe(
      tap((_) => this.log(`updated user id=${user.id}: ${url}`)),
      catchError(this.handleError<CalendarUser>('updateUser')),      
    );
  }
  
  addUser(): Observable<CalendarUser> {
    const url = `${this.userUrl}`;
    const userTemplate:CalendarUser={id:0,name:"",admin:false,password:""}

    return this.http.post<CalendarUser>(url,userTemplate, this.httpOptions).pipe(
      tap((_) => this.log(`new iser: ${url}`)),
      catchError(this.handleError<CalendarUser>('adduser')),      
    );
  }

  deleteUser(id: number): Observable<CalendarEvent> {
    const url = `${this.eventUrl}${id}`;

    return this.http.delete<CalendarEvent>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted event id=${id}: ${url}`)),
      catchError(this.handleError<CalendarEvent>('deleteUser')),      
    );
    
  }

  getEvents(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(`${this.eventUrl}`); 
  }

  deleteEvent(id: number): Observable<CalendarEvent> {
    const url = `${this.eventUrl}${id}`;

    return this.http.delete<CalendarEvent>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted event id=${id}: ${url}`)),
      catchError(this.handleError<CalendarEvent>('deleteEvent')),      
    );
    
  }
 
  addEvent(): Observable<CalendarEvent> {
    const url = `${this.eventUrl}`;
    const eventTemplate:CalendarEvent={id:0,name:"",dateTime:new Date(),replies:[]}

    return this.http.post<CalendarEvent>(url,eventTemplate, this.httpOptions).pipe(
      tap((_) => this.log(`new event: ${url}`)),
      catchError(this.handleError<CalendarEvent>('deleteEvent')),      
    );
  }

  updateEvent(event:CalendarEvent):Observable<CalendarEvent> {
    const url = `${this.eventUrl}${event.id}`;
    console.log(event);
    return this.http.put<CalendarEvent>(url, event,this.httpOptions).pipe(
      tap((_) => this.log(`deleted event id=${event.id}: ${url}`)),
      catchError(this.handleError<CalendarEvent>('deleteEvent')),      
    );
  }

  getEvent(id: number): Observable<CalendarEvent> {
    const url = `${this.eventUrl}${id}`;

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

  

  logout(){
      
    this.setCurrentUser({id:0,name:"",password:"",admin:false});      
    
  }
}
