import { Component, OnInit, ViewChild } from '@angular/core';
import { NavService } from '../nav.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../newAppointment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OwlDateTimeInlineComponent, OwlDateTimeIntl } from 'ng-pick-datetime';

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
  console = console;
  date;
  month;
  day;
  year;
  realDate: string;
  dt1;
  hour;
  minutes;
  time;


  constructor(public navservice: NavService,
    private router: Router, public newappointmentservice: AppointmentService, private formBuilder: FormBuilder) { }

 // @ViewChild(OwlDateTimeInlineComponent, {static: false})

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

  }
  dateSubmit(){
    this.day = this.firstForm.value.firstCtrl.getDate();
    this.month = this.firstForm.value.firstCtrl.getMonth() + 1;
    this.year = this.firstForm.value.firstCtrl.getFullYear();
    this.realDate = this.day +'/'+ this.month +'/'+ this.year;
    console.log(this.realDate);
  }
  timeSubmit(){
    this.hour = this.thirdForm.value.thirdCtrl.getHours() ;
    this.minutes = this.thirdForm.value.thirdCtrl.getMinutes() ;
    this.time = this.hour +':' + this.minutes;
    console.log(this.time);
  }

  finishAppointment() {
    this.newappointmentservice.printTester();
  };

}
