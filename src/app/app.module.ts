import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { DateTimeFormatPipe } from './date-time-format.pipe';
import { ReplyFormatPipe } from './reply-format-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

import { InMemoryDbService, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { EvententryComponent } from './evententry/evententry.component';
import { EditevententryComponent } from './editevententry/editevententry.component';
import { LoginComponent } from './login/login.component';
import { ReplytoeventComponent } from './replytoevent/replytoevent.component';
import { EventreplysComponent } from './eventreplys/eventreplys.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [AppComponent, EventsComponent, DateTimeFormatPipe,ReplyFormatPipe, EvententryComponent, EditevententryComponent, LoginComponent, ReplytoeventComponent, EventreplysComponent, UserlistComponent, UserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
