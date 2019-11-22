import { Injectable } from '@angular/core';
import { NavService } from './nav.service';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  date: string;
  week: string;
  note: string;
  people: string[] = [];
  place: string;
  type: string;

  constructor() {
  }
  public makeNewNotifier() {
    this.clearAll();
    console.log(this.note);
    console.log(this.week);
    console.log(this.date);
    console.log(this.people);
    console.log(this.place);
    console.log(this.type);
  }
  public printTester(){

  }
  public clearAll() {
    console.log(this.note);
    this.date = '';
    this.note = '';
    this.people = '';
    this.place = '';
    this.type = '';
    this.week = '';
  }

}

