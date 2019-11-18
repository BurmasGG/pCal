import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeViewComponent } from './home-view/home-view.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { NextWeekComponent } from './next-week/next-week.component';
import { PrevWeekComponent } from './prev-week/prev-week.component';
import { EventViewComponent } from './event-view/event-view.component';
import { MonthViewComponent } from './month-view/month-view.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DateComponent } from './new-appointment/date/date.component';
import { PlaceComponent } from './new-appointment/place/place.component';
import { TimeComponent } from './new-appointment/time/time.component';
import { ParticipantComponent } from './new-appointment/participant/participant.component';
import { NoteComponent } from './new-appointment/note/note.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    NavBarComponent,
    NewAppointmentComponent,
    NextWeekComponent,
    PrevWeekComponent,
    EventViewComponent,
    MonthViewComponent,
    DateComponent,
    PlaceComponent,
    TimeComponent,
    ParticipantComponent,
    NoteComponent,
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatDatepickerModule
     ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
