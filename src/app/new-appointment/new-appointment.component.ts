import { Component, OnInit, ViewChild } from '@angular/core';
import { NavService } from '../nav.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../newAppointment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {
  isLinear = false;
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  fourthForm: FormGroup;
  fifthForm: FormGroup;
  sixthForm: FormGroup;
  console = console;
  date;
  month;
  day;
  year;
  realDate: string;
  hour = 12;
  minutes = 30;
  time;


  constructor(public navservice: NavService,
    private router: Router, public newappointmentservice: AppointmentService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    if (this.navservice.wasHome === false) {
      this.router.navigate(['/home']);
    }
    this.firstForm = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondForm = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdForm = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthForm = this.formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.fifthForm = this.formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
    this.sixthForm = this.formBuilder.group({
      sixthCtrl: ['', Validators.required]
    });


  }
  dateSubmit(firstForm) {
    this.day = this.firstForm.value.firstCtrl.getDate();
    this.month = this.firstForm.value.firstCtrl.getMonth() + 1;
    this.year = this.firstForm.value.firstCtrl.getFullYear();
    this.realDate = this.day + '/' + this.month + '/' + this.year;
    console.log(this.realDate);
  }

  timeSubmit() {
    this.time = this.hour.toString() + ':' + this.minutes.toString();
    console.log(this.time);

  }

  finishAppointment() {
    this.newappointmentservice.printTester();

  }
  hourUp() {
    this.hour += 1;
    console.log(this.hour);
  }
  hourDown() {
    this.hour -= 1;
    console.log(this.hour);

  }
  minuteUp() {
    this.minutes += 5;
  }
  minuteDown() {
    this.minutes -= 5;
  }

}
