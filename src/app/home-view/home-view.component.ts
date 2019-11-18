import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})

export class HomeViewComponent implements OnInit {

  public days = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"];
  public eventsSorted = [[], [], [], [], []];

  constructor(private navservice: NavService) { }

  
  ngOnInit()
  {
    this.navservice.wasHome = true;

    this.AddEvent("Kaffe med Ulla", "Vi skal have kaffe.", "18-11-2019", "12:30", "Ulla", "Torvecaféen");
    this.AddEvent("Frisør lol", "Jeg skal klippes.", "19-11-2019", "13:00", "", "Herregodt Hår");
  }

  public ShowEvent(day, event)
  {
    let t = this.eventsSorted[day][event]
    alert(t.date + " " + t.time + "\n" + t.title + "\n" + t.note + "\nMed: " + t.people + "\n" + t.place);
    console.log(t.title);
  }

  public AddEvent(_title, _note, _date, _time, _people, _place)
  { 
    const event = {title: _title, note: _note, date: _date, time: _time, people: _people, place: _place};
    this.UpdateEventList(event);
  }


  public UpdateEventList(e)
  {
    let curMonth = new Date().getUTCMonth() + 1;
    let curDay = new Date().getUTCDate();

    let eDay = e.date.substring(0,2);
    let eMonth = e.date.substring(3,5);

    if (eMonth == curMonth)
    {
      let dayInt = eDay - curDay;
      if (dayInt < 5)
      {
        this.eventsSorted[dayInt].push(e);

        console.log("Added " + e.title + " to " + this.days[dayInt]);
      }
    }
  }
}
