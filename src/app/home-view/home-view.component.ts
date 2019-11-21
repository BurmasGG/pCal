import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav.service';
import { DatePipe } from '@angular/common';
import { EventViewComponent } from '../event-view/event-view.component';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})

export class HomeViewComponent implements OnInit {

  // week view
  date = new Date();
  dp = new DatePipe('en-DK');
  public day = this.dp.transform(this.date, 'd');
  public week = this.dp.transform(this.date, 'w');
  public weekday = this.date.getUTCDay();
  public month = this.dp.transform(this.date, 'M')

  // 5 day view
  public days = ["I dag", "I morgen", "Om 2 dage", "Om 3 dage", "Om 4 dage"];

  constructor(private navservice: NavService, private eventView: EventViewComponent) { }

  public eventsSorted = [[], [], [], [], []]; // dagene events skal ind under

  public AddEvent(_title, _note, _date, _time, _people = "", _place = "") {
    const event = { title: _title, note: _note, date: _date, time: _time, people: _people, place: _place };
    this.UpdateEventListFive(event);
  }

  public UpdateEventListFive(e) {
    let curMonth = new Date().getUTCMonth() + 1; // 0 = Januar, 1 = Februar
    let curDay = new Date().getUTCDate();

    let eDay = e.date.substring(0, 2);
    let eMonth = e.date.substring(3, 5);

    if (eMonth == curMonth) {
      let dayInt = eDay - curDay;
      if (dayInt < 5 && dayInt > -1) {
        this.eventsSorted[dayInt].push(e);
      }
    }
  }

  public UpdateEventListWeek(e) {
    let curMonth = new Date().getUTCMonth() + 1; // 0 = Januar, 1 = Februar
    let curDay = new Date().getUTCDate();

    let eDay = e.date.substring(0, 2);
    let eMonth = e.date.substring(3, 5);

    if (eMonth == curMonth) {
      let dayInt = eDay - curDay;
      if (dayInt < 5 && dayInt > -1) {
        this.eventsSorted[dayInt].push(e);
      }
    }
  }

  ngOnInit() {
    this.navservice.wasHome = true;

    this.AddEvent("Ny bil", "Rundtur i den nye bil.", "21-11-2019", "12:30", "Ulla", "Torvecaféen");
    this.AddEvent("Frisør", "Ulla kommer og henter mig.", "23-11-2019", "13:00", "", "Herregodt Hår");
    this.AddEvent("Stress Testing this event thingi because I wanna see how it handles long stuff (hehe)", "Pulvinar neque laoreet suspendisse interdum. Risus nullam eget felis eget nunc lobortis.", "22-11-2019", "12:30", "Ulla og Oliver", "Min lejlighed");
  }

}
