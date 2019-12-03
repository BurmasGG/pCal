import { Component } from '@angular/core';
import { ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { AppointmentService } from './newAppointment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pCal';

constructor( public newappointment: AppointmentService, public appointmentcomponent: NewAppointmentComponent){}
}
