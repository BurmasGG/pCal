import { Injectable } from '@angular/core';
import { NavService } from './nav.service';

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


  constructor() {
  }
  public makeNewNotifier() {

    this.clearAll();

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
  }

}

