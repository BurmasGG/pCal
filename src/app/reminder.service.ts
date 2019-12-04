import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor() { }

  date = new Date();
  dp = new DatePipe('en-DK');
  curDay; curWeek; curMonth; curYear;
  public eventsCurWeek = []; // hold styr på current week's events, uanset valgt uge
  
  // event info
  id;
  type;
  note;
  year;
  month;
  day;
  time;
  people;
  place;

  GetTodayDate()
  {
    this.date = new Date();
    this.curDay = Number(this.dp.transform(this.date, 'd'));
    this.curWeek = Number(this.dp.transform(this.date, 'w'));
    this.curMonth = Number(this.dp.transform(this.date, 'M'));
    this.curYear = Number(this.dp.transform(this.date, 'y'));
  }

}
