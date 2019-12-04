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

@Component({
  selector: 'app-new-appointment',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css',  "../../../node_modules/simple-keyboard/build/css/index.css"],
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
  editing = "false";
  eventID = "";
  month = 0;
  day = 0;
  year = 0;
  note = "";
  place = "";
  people = "";
  realDate = "";
  hour = 12;
  minutes = 30;
  time = "";
  type = "";
  noteTekst = "";
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
      onChange: input => this.onChange1(input),
      layout: layout,
      theme: "simple-keyboard hg-theme-default hg-layout-default",
    });

    let keyboard2 = new Keyboard(".keyboard2", {
      onChange: input => this.onChange2(input),
      layout: layout,
      theme: "simple-keyboard hg-theme-default hg-layout-default",
    });

    let keyboard3 = new Keyboard(".keyboard3", {
      onChange: input => this.onChange3(input),
      layout: layout,
      theme: "simple-keyboard hg-theme-default hg-layout-default",
    });

    if(this.newappointmentservice.id != "")
    {
      console.log("Editing event: " + this.newappointmentservice.note);
      this.isTypeCompleted = true;
      this.isTimeCompleted = true;

      switch (this.newappointmentservice.type) {
        case "Familie": {
          this.pickFam();
          break;
        }
        case "SCN": {
          this.objSCN();
          break;
        }
        case "Underholdning": {
          this.pickBall();
          break;
        }
        case "Sunhedsvæsenet": {
          this.pickHealth();
          break;
        }
        default: {
          console.log("Editing::: Type not recognized");
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

  }


  dateSubmit(firstForm) {
    this.day = this.firstForm.value.firstCtrl.getDate();
    this.month = this.firstForm.value.firstCtrl.getMonth() + 1;
    this.year = this.firstForm.value.firstCtrl.getFullYear();
    this.realDate = this.day + '/' + this.month + '/' + this.year;
  }
  pickType() {
    if (this.isTypeCompleted == false) {
      this.toastrService.info('Du skal vælge en type før du kan fortsætte');
    }
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
      this.minutes = 0;
    }
  }
  minuteDown() {
    this.isTimeCompleted = true;
    this.minutes -= 5;
    if (this.minutes < 0) {
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
    console.log("FAM is picked")
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
    console.log("Health is picked")

  }
  pickBall() {
    this.objSCN.id = 'SCNImg';
    this.objBall.id = 'fluebenImg';
    this.objFam.id = 'famImg';
    this.objHealth.id = 'healthImg';
    this.type = 'Underholdning';
    this.isTypeCompleted = true;
    console.log("Ball is picked")

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
    this.newappointmentservice.printTester();
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

  onChange1 = (input: string) => {
    this.noteTekst = input;
    this.newappointmentservice.note = this.noteTekst;
  };

  onChange2 = (input: string) => {
    this.deltagerTekst = input;
    this.newappointmentservice.people = this.deltagerTekst;
  };

  onChange3 = (input: string) => {
    this.stedTekst = input;
    this.newappointmentservice.place = this.stedTekst;
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };
}
