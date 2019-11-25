import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/nav.service';
import { AppointmentService } from 'src/app/newAppointment.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  constructor(public navservice: NavService, public newappointmentservice: AppointmentService) { }

  ngOnInit() {
  }
  saveAppointment() {
    console.log('this doesnt work yet!');
  }
  addPlace() {
    this.newappointmentservice.printTester();
  }
}
