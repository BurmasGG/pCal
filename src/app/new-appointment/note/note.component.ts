import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/nav.service';
import { AppointmentService } from 'src/app/newAppointment.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor(public navservice: NavService, public newappointmentservice: AppointmentService) {

  }

  note: string;
  ngOnInit() {
  }
  buttonClicked() {
    this.navservice.Toggle = 3;

  }
  test(){
    this.newappointmentservice.clearAll();
  }
}
