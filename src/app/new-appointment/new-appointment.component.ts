import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavService } from '../nav.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../newAppointment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Keyboard from "simple-keyboard";
import layout from "./danishKeyboard";
import { EventService } from '../event.service';
import { ToastrService } from 'ngx-toastr';
import { EventViewComponent } from '../event-view/event-view.component';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-new-appointment',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css', "../../../node_modules/simple-keyboard/build/css/index.css"],
  providers: [EventViewComponent]
})

export class NewAppointmentComponent implements OnInit {
  isLinear = true;
  isTypeCompleted = false;
  isTimeCompleted = true;
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
  eventInfo: string[];
  id = "";
  editing = false;
  eventID = "";
  month = 0;
  day = 0;
  year = 0;
  note = "";
  place = "";
  people = "";
  realDate = "";
  hour = 12;
  s_hour = "12";
  minutes = 30;
  s_minutes = "30";
  time = "";
  type = "";
  noteTekst: string = "";
  deltagerTekst = "";
  stedTekst = "";
  keyboard: Keyboard;
  noteInp: string;

  constructor(public navservice: NavService,
    private router: Router, public newappointmentservice: AppointmentService, private formBuilder: FormBuilder,
    private eventservice: EventService, private toastrService: ToastrService, private eventView: EventViewComponent) { }

  objSCN; objFam; objHealth; objBall;

  ngAfterViewInit(): void {

    this.objSCN = document.getElementById('SCNImg');
    this.objFam = document.getElementById('famImg');
    this.objHealth = document.getElementById('healthImg');
    this.objBall = document.getElementById('ballImg');

    let keyboard1 = new Keyboard(".keyboard1", {
      onKeyPress: button =>this.onKeyPress1(button),
      layout: layout,
      theme: "simple-keyboard hg-theme-default hg-layout-default",
    });

    let keyboard2 = new Keyboard(".keyboard2", {
      onKeyPress: button =>this.onKeyPress2(button),
      layout: layout,
      theme: "simple-keyboard hg-theme-default hg-layout-default",
    });

    let keyboard3 = new Keyboard(".keyboard3", {
      onKeyPress: button =>this.onKeyPress3(button),
      layout: layout,
      theme: "simple-keyboard hg-theme-default hg-layout-default",
    });

    if (this.newappointmentservice.id != "") {
      this.editing = true;
      console.log("Editing event: " + this.newappointmentservice.note + " type: " + this.newappointmentservice.type);
      this.isTypeCompleted = true;
      this.isTimeCompleted = true;

      switch (this.newappointmentservice.type) {
        case "Familie": {
          this.pickFam();
          break;
        }
        case "SCN": {
          this.pickSCN();
          break;
        }
        case "Underholdning": {
          this.pickBall();
          break;
        }
        case "Sundhedsvæsenet": {
          this.pickHealth();
          break;
        }
        default: {
          console.log("Editing::: Type not recognized: " + this.newappointmentservice.type);
          break;
        }
      }
    }
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

    if (this.newappointmentservice.editing === true) {
      this.editEvent();
      this.noteTekst = this.note;
      this.deltagerTekst = this.people;
      this.stedTekst = this.place;
    }
  }

  dateSubmit(firstForm) {
    this.day = this.firstForm.value.firstCtrl.getDate();
    this.month = this.firstForm.value.firstCtrl.getMonth() + 1;
    this.year = this.firstForm.value.firstCtrl.getFullYear();
    this.realDate = this.day + '/' + this.month + '/' + this.year;
    console.log('Emil er trash')
  }
  pickType() {
    if (this.isTypeCompleted == false) {
      this.toastrService.info('Du skal vælge en type før du kan fortsætte');
    }
  }

  timeSubmit() {
    if (this.isTimeCompleted === false)
    {
      this.toastrService.info('Du skal vælge et tidspunkt, før du kan fortsættte');
      return;
    }
    let s_minutes = this.minutes.toString();

    this.time = this.s_hour + ':' + this.s_minutes;
  }

  finishAppointment() {
   // this.newappointmentservice.printTester();
  }
  hourUp() {
    console.log('Emil er trash')
    this.isTimeCompleted = true;
    this.hour += 1;
    if (this.hour > 23) {
      this.hour = 1;
    }

    this.s_hour = this.hour.toString();
    if (this.s_hour.length < 2) this.s_hour = "0" + this.s_hour;
  }
  hourDown() {
    this.isTimeCompleted = true;
    this.hour -= 1;
    if (this.hour < 1) {
      this.hour = 23;
    }

    this.s_hour = this.hour.toString();
    if (this.s_hour.length < 2) this.s_hour = "0" + this.s_hour;
  }
  minuteUp() {
    this.isTimeCompleted = true;
    this.minutes += 5;
    if (this.minutes > 55) {
      this.minutes = 0;
    }

    this.s_minutes = this.minutes.toString();
    if (this.s_minutes.length < 2) this.s_minutes = "0" + this.s_minutes;
  }
  minuteDown() {
    this.isTimeCompleted = true;
    this.minutes -= 5;
    if (this.minutes < 0) {
      this.minutes = 55;
    }

    this.s_minutes = this.minutes.toString();
    if (this.s_minutes.length < 2) this.s_minutes = "0" + this.s_minutes;
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
    this.type = 'Sundhedsvæsenet';
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
    this.newappointmentservice.clearAll();
  }
  saveAppointment() {
    this.newappointmentservice.type = this.type;
    this.newappointmentservice.time = this.time;
    this.newappointmentservice.date = this.realDate;
    this.newappointmentservice.time = this.time;
    this.newappointmentservice.makeDateNumber();

    if (this.editing) {
      console.log("[" + this.id + "] ny note: " + this.newappointmentservice.note)
      this.eventservice.UpdateEvent(this.id, true, this.type, this.newappointmentservice.note, this.newappointmentservice.year, this.newappointmentservice.month, this.newappointmentservice.day, this.time, this.newappointmentservice.people, this.newappointmentservice.place).subscribe((data: Event[]) => {
        if (data['event'] == "Success") {
          this.toastrService.success(this.newappointmentservice.note + ' blev opdateret.', 'Success!');
          this.routeToHome();
        }
        else {
          if (data['reason'] != "") {
            this.toastrService.error(data['reason'], 'Fejl!');
          }
          else {
            this.toastrService.error('Noget gik galt. Prøv igen om lidt.', 'Fejl!');
          }
        }
      });
    }
    else {
      this.eventservice.AddEvent(this.type, this.newappointmentservice.note, this.newappointmentservice.year, this.newappointmentservice.month, this.newappointmentservice.day, this.time, this.newappointmentservice.people, this.newappointmentservice.place).subscribe((data: Event[]) => {
        if (data['event'] == "Success") {
          this.toastrService.success('Din aftale blev gemt.', 'Success!');
          this.routeToHome();
        }
        else {
          if (data['reason'] != "") {
            this.toastrService.error(data['reason'], 'Fejl!');
          }
          else {
            this.toastrService.error('Noget gik galt. Prøv igen om lidt.', 'Fejl!');
          }
        }
      });
    }
  }

  onKeyPress1 = (button: string) => {
      if (button == "{bksp}")
      {
        this.noteTekst = this.noteTekst.substring(0, this.noteTekst.length - 1);
      }
      else if (button == "{space}")
      {
        this.noteTekst = this.noteTekst + " ";
      }
      else
      {
        this.noteTekst = this.noteTekst + button;
      }

      this.newappointmentservice.note = this.noteTekst;
  }

  onKeyPress2 = (button: string) => {
      if (button == "{bksp}")
      {
        this.deltagerTekst = this.deltagerTekst.substring(0, this.deltagerTekst.length - 1);
      }
      else if (button == "{space}")
      {
        this.deltagerTekst = this.deltagerTekst + " ";
      }
      else
      {
        this.deltagerTekst = this.deltagerTekst + button;
      }

      this.newappointmentservice.people = this.deltagerTekst;
  }

  onKeyPress3 = (button: string) => {
      if (button == "{bksp}")
      {
        this.stedTekst = this.stedTekst.substring(0, this.stedTekst.length - 1);
      }
      else if (button == "{space}")
      {
        this.stedTekst = this.stedTekst + " ";
      }
      else
      {
        this.stedTekst = this.stedTekst + button;
      }

    this.newappointmentservice.place = this.stedTekst;
  }

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
    console.log(event.target.value);
  }

  editEvent() {
    this.id = this.newappointmentservice.id;
    this.type = this.newappointmentservice.type;
    this.time = this.newappointmentservice.time;
    this.people = this.newappointmentservice.people;
    this.place = this.newappointmentservice.place;
    this.note = this.newappointmentservice.note;
    this.realDate = this.newappointmentservice.date;
    this.hour = this.newappointmentservice.hour;
    this.minutes = this.newappointmentservice.minutes;

  }
}
