import { Component, OnInit, ViewChild } from '@angular/core';
import { NavService } from '../nav.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../newAppointment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OwlDateTimeInlineComponent, OwlDateTimeIntl, OwlDateTimeComponent } from 'ng-pick-datetime';

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
  hour;
  minutes;
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
    console.log('oof')
    console.log(this.sixthForm)

  }
  dateSubmit(firstForm) {
    this.day = this.firstForm.value.firstCtrl.getDate();
    this.month = this.firstForm.value.firstCtrl.getMonth() + 1;
    this.year = this.firstForm.value.firstCtrl.getFullYear();
    this.realDate = this.day + '/' + this.month + '/' + this.year;
    console.log(this.realDate);
  }

  hourSubmit(thirdForm) {

    this.hour = this.thirdForm.value.thirdCtrl.toString();
    console.log(this.hour);
  }
  minuteSubmit(sixthForm) {
    this.minutes = this.sixthForm.value.sixthCtrl.toString();
    console.log(this.hour);
  }

  finishAppointment() {
    this.newappointmentservice.printTester();

  }
  hourUp() {
    this.sixthForm.value.sixthCtrl ++;
  }
  hourDown() {
    this.sixthForm.value.sixthCtrl --;
  }
  minuteUp() {
    this.thirdForm.value.thirdCtrl ++;
  }
  minuteDown() {
    this.thirdForm.value.thirdCtrl --;
  }


}
