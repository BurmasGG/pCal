import { Injectable } from '@angular/core';
import { NavService } from './nav.service';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  date: string;
  note: string;
  people: string;
  place: string;
  type: string;
  time: string;
  hour: number;
  minutes: number;
  day;
  month;
  year;

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
    this.date = '';
    this.note = '';
    this.people = '';
    this.place = '';
    this.type = '';
    this.time = '';
  }
  makeAppointment() {
    this.eventservice.AddEvent(this.type, this.note, this.year, this.month, this.day, this.time, this.people, this.place);
  }

}

