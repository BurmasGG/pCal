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
import { MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MAT_DIALOG_DATA, MatDialog, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DateComponent } from './new-appointment/date/date.component';
import { PlaceComponent } from './new-appointment/place/place.component';
import { TimeComponent } from './new-appointment/time/time.component';
import { ParticipantComponent } from './new-appointment/participant/participant.component';
import { NoteComponent } from './new-appointment/note/note.component';
import { EventTypeComponent } from './new-appointment/event-type/event-type.component';
import { MatCardModule } from '@angular/material/card';
import { EventDialogComponent } from './event-dialog/event-dialog.component';

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
    EventDialogComponent,
    EventTypeComponent,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatNativeDateModule,
    MatDialogModule
     ],
  providers: [EventDialogComponent, EventViewComponent, HomeViewComponent, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose: false, autoFocus: true, width: 450, height: 450}}],
  bootstrap: [AppComponent],
  entryComponents: [EventDialogComponent]
})
export class AppModule { }
