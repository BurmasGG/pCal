import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavService } from '../nav.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../newAppointment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Keyboard from "simple-keyboard";
import layout from "./danishKeyboard";
import { EventService } from '../event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-appointment',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css',
    "../../../node_modules/simple-keyboard/build/css/index.css"]
})
export class NewAppointmentComponent implements OnInit {
  isLinear = true;
  isTypeCompleted = false;
  isTimeCompleted = false;
  timeClicked = false;
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
  month;
  day;
  year;
  note: string;
  realDate: string;
  hour = 0;
  minutes = 0;
  time;
  type: string;
  noteTekst = "";
  keyboard: Keyboard;
  noteInp: string;

  constructor(public navservice: NavService,
    private router: Router, public newappointmentservice: AppointmentService, private formBuilder: FormBuilder,
    private eventservice: EventService, private toastrService: ToastrService, ) { }

  objSCN; objFam; objHealth; objBall;


  ngAfterViewInit(): void {
    this.objSCN = document.getElementById('SCNImg');
    this.objFam = document.getElementById('famImg');
    this.objHealth = document.getElementById('healthImg');
    this.objBall = document.getElementById('ballImg');

    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      layout: layout
    });
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

  keyboardTester(secondForm) {
    this.noteInp = this.secondForm.value.secondCtrl;
    console.log(this.noteInp);
  }

  dateSubmit(firstForm) {
    this.day = this.firstForm.value.firstCtrl.getDate();
    this.month = this.firstForm.value.firstCtrl.getMonth() + 1;
    this.year = this.firstForm.value.firstCtrl.getFullYear();
    this.realDate = this.day + '/' + this.month + '/' + this.year;
  }

  timeSubmit() {
    this.time = this.hour.toString() + ':' + this.minutes.toString();
    if (this.isTimeCompleted === false) {
      this.toastrService.info('Du skal vælge et tidspunkt, før du kan fortsættte');
    }

  }

  finishAppointment() {
    this.newappointmentservice.printTester();
  }
  hourUp() {
    this.isTimeCompleted = true;
    this.hour += 1;
    if (this.hour > 23) {
      this.hour = 1;
    }
  }
  hourDown() {
    this.isTimeCompleted = true;
    this.hour -= 1;
    if (this.hour < 1) {
      this.hour = 23;
    }

  }
  minuteUp() {
    this.isTimeCompleted = true;
    this.minutes += 5;
    if (this.minutes > 55) {
      this.minutes = 5;
    }
  }
  minuteDown() {
    this.isTimeCompleted = true;
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
    this.type = 'Familie';
    this.isTypeCompleted = true;
  }
  pickSCN() {
    this.objSCN.id = 'fluebenImg';
    this.objBall.id = 'ballImg';
    this.objFam.id = 'famImg';
    this.objHealth.id = 'healthImg';
    this.type = 'SCN';
    this.isTypeCompleted = true;

  }

  pickHealth() {
    this.objSCN.id = 'SCNImg';
    this.objBall.id = 'ballImg';
    this.objFam.id = 'famImg';
    this.objHealth.id = 'fluebenImg';
    this.type = 'Sunhedsvæsenet';
    this.isTypeCompleted = true;

  }
  pickBall() {
    this.objSCN.id = 'SCNImg';
    this.objBall.id = 'fluebenImg';
    this.objFam.id = 'famImg';
    this.objHealth.id = 'healthImg';
    this.type = 'Underholdning';
    this.isTypeCompleted = true;

  }
  routeToHome() {
    this.router.navigate(['/home']);
  }
  delete() {
    this.newappointmentservice.time = '';
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
    this.toastrService.success('Din aftale blev gemt', 'Success!');
    this.newappointmentservice.makeDateNumber();
    this.newappointmentservice.printTester();

  }
  pickType() {
    if (this.isTypeCompleted == false) {
      this.toastrService.info('Du skal vælge en type før du kan fortsætte');
      console.log('tis');
    }
  }

  onChange = (input: string) => {
    this.noteTekst = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };



}
