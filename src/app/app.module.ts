import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatNativeDateModule, MatDialogModule, MAT_DIALOG_DATA, MatDialog, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DATE_LOCALE } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl } from 'ng-pick-datetime';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from './event.service';
import { ToastrModule } from 'ngx-toastr';

// export class DefaultIntl extends OwlDateTimeIntl = {
//   hour12AMLabel = '',
//   hour12PMLaben = '',
// }

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
    EventDialogComponent,
  ],
  imports: [
    NgbModule,
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
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatStepperModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      extendedTimeOut: 2000,
      tapToDismiss: false,
      positionClass: 'toast-center-center',
      preventDuplicates: true,
    }),

  ],
  providers: [NewAppointmentComponent, EventService, EventDialogComponent, EventViewComponent, HomeViewComponent, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, disableClose: false, autoFocus: true, width: 450, height: 450 } }],
  bootstrap: [AppComponent],
  entryComponents: [EventDialogComponent]
})
export class AppModule { }
