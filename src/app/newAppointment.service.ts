import { Injectable } from '@angular/core';
import { NavService } from './nav.service';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  id: string = "";
  date: string = "";
  note: string = "";
  people: string = "";
  place: string = "";
  type: string = "";
  time: string = "";
  hour: number = 12;
  minutes: number = 30;
  day = 1;
  month = 1;
  year = 2020;

  constructor(private eventservice: EventService, ) {
  }
  public makeNewNotifier() {

    this.clearAll();

  }
  makeDateNumber() {
    let datoes: string[] = this.date.split('/');

    this.day = Number(datoes[0]);
    this.month = Number(datoes[1]);
    this.year = Number(datoes[2]);
    console.log(this.day, this.month, this.year);
  }
  public printTester() {
    console.log(this.date);
    console.log(this.note);
    console.log(this.time);
    console.log(this.people);
    console.log(this.place);
    console.log(this.type);
  }
  public clearAll() {
    this.id = "";
    this.date = "";
    this.note = "";
    this.people = "";
    this.place = "";
    this.type = "";
    this.time = "";
    this.hour = 12;
    this.minutes = 30;
    this.day = 1;
    this.month = 1;
    this.year = 2020;
  }

  public SetValues(e)
  {
    this.id = e._id;
    this.type = e.type;
    this.note = e.note;
    this.time = e.time;
    this.year = e.year;
    this.month = e.month;
    this.day = e.day;
    this.people = e.people;
    this.place = e.place;

  }
}
