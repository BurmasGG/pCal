import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/nav.service';
import { NewAppointmentComponent } from '../new-appointment.component';
import { AppointmentService } from 'src/app/newAppointment.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
date = new FormControl();

  constructor(
    public navservice: NavService, public newappointmentservice: AppointmentService) { }

  ngOnInit() {
  }
  buttonClicked() {
    this.navservice.Toggle = 2;
  }
  test() {
    this.newappointmentservice.clearAll();
  }
}
