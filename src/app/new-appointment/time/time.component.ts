import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/nav.service';
import { AppointmentService } from 'src/app/newAppointment.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  timeFormControl = new FormControl();

  constructor(public navservice: NavService, public newappointmentservice: AppointmentService) { }

  ngOnInit() {
  }
  buttonClicked() {
    this.navservice.Toggle = 4;
  }
  test() {
  }
}
