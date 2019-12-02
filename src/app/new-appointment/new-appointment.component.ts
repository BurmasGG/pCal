import { Component, OnInit, ViewChild } from '@angular/core';
import { NavService } from '../nav.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../newAppointment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {ToastrService} from 'ngx-toastr';

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
  typeForm: FormGroup;
  console = console;
  public pickedFam = false;
  public pickedSCN = false;
  public pickedHealth = false;
  public pickedBall = false;
  public isChecked = false;
  date;
  month;
  day;
  year;
  realDate: string;
  hour = 12;
  minutes = 30;
  time;
  type: string;

  constructor(public navservice: NavService,
    private router: Router, public newappointmentservice: AppointmentService, private formBuilder: FormBuilder, private toastrService:ToastrService) { }

  objSCN; objFam; objHealth; objBall;

  ngAfterViewInit(): void {
    this.objSCN = document.getElementById('SCNImg');
    this.objFam = document.getElementById('famImg');
    this.objHealth = document.getElementById('healthImg');
    this.objBall = document.getElementById('ballImg');
  }

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
    this.typeForm = this.formBuilder.group({
      typeCtrl: ['', Validators.required]
    });

  }
  dateSubmit(firstForm) {
    this.day = this.firstForm.value.firstCtrl.getDate();
    this.month = this.firstForm.value.firstCtrl.getMonth() + 1;
    this.year = this.firstForm.value.firstCtrl.getFullYear();
    this.realDate = this.day + '/' + this.month + '/' + this.year;
  }

  timeSubmit() {
    this.time = this.hour.toString() + ':' + this.minutes.toString();

  }

  finishAppointment() {
    this.newappointmentservice.printTester();
  }
  hourUp() {
    this.hour += 1;
    if (this.hour > 24) {
      this.hour = 1;
    }
  }
  hourDown() {
    this.hour -= 1;
    if (this.hour < 0) {
      this.hour = 24;
    }

  }
  minuteUp() {
    this.minutes += 5;
    if (this.minutes > 55) {
      this.minutes = 5;
    }
  }
  minuteDown() {
    this.minutes -= 5;
    if (this.minutes < 5) {
      this.minutes = 55;
    }
  }
  pickFam() {
    this.objSCN.id = 'SCNImg';
    this.objBall.id = 'ballImg';
    this.objFam.id = 'fluebenImg';
    this.objHealth.id = 'healthImg';
    this.type = "Familie aftale";
  }
  pickSCN() {
    this.objSCN.id = 'fluebenImg';
    this.objBall.id = 'ballImg';
    this.objFam.id = 'famImg';
    this.objHealth.id = 'healthImg';
    this.type = "aftale med SCN";
  }

  pickHealth() {
    this.objSCN.id = 'SCNImg';
    this.objBall.id = 'ballImg';
    this.objFam.id = 'famImg';
    this.objHealth.id = 'fluebenImg';
    this.type = "Aftale med sunhedvæsenet";
  }
  pickBall() {
    this.objSCN.id = 'SCNImg';
    this.objBall.id = 'fluebenImg';
    this.objFam.id = 'famImg';
    this.objHealth.id = 'healthImg';
    this.type = 'Underholdning'
  }
  routeToHome() {
    this.router.navigate(['/home']);
  }
  delete() {
    this.newappointmentservice.time =  '';
    this.newappointmentservice.date = '';
    this.newappointmentservice.note = '';
    this.newappointmentservice.people = '';
    this.newappointmentservice.place = '';
    this.newappointmentservice.printTester();
    this.routeToHome();
  }
  saveAppointment() {
    this.newappointmentservice.type = this.type;
    this.newappointmentservice.date = this.realDate;
    this.newappointmentservice.time = this.time;
    this.router.navigate(['home']);
        /*Toastr-message when new appointment save-button is pressed*/
    this.toastrService.success('Din aftale blev gemt', 'Success!'); 

    this.newappointmentservice.printTester();
  }
}

