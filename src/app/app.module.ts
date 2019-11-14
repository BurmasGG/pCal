import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeViewComponent } from './home-view/home-view.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TestComponent } from './src/app/nav-bar/test/test.component';
import { Month } from './month.view/month.view.component';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { NextWeekComponent } from './next-week/next-week.component';
import { PrevWeekComponent } from './prev-week/prev-week.component';
import { EventViewComponent } from './event-view/event-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    NavBarComponent,
    TestComponent,
    Month.ViewComponent,
    NewAppointmentComponent,
    NextWeekComponent,
    PrevWeekComponent,
    EventViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
