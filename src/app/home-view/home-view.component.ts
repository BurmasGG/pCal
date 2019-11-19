import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav.service';
import { MatDialog } from '@angular/material';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})

export class HomeViewComponent implements OnInit {

  public days = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"];
  public eventsSorted = [[], [], [], [], []];

  constructor(private navservice: NavService, public dialog: MatDialog) {}
  
  ngOnInit()
  {
    this.navservice.wasHome = true;

    this.AddEvent("Kaffe med Ulla", "Vi skal have kaffe.", "20-11-2019", "12:30", "Ulla", "Torvecaféen");
    this.AddEvent("Frisør lol", "Jeg skal klippes.", "21-11-2019", "13:00", "", "Herregodt Hår");
  }

  public ShowEvent(day, event)
  {
    let t = this.eventsSorted[day][event];

    let dialogRef = this.dialog.open(EventDialogComponent, {
      autoFocus: true,
      disableClose: false,

      data:{
        title: t.title,
        note: t.note, 
        date: t.date,
        time: t.time,
        people: t.people,
        place: t.place
      }
    });


  }

  public AddEvent(_title, _note, _date, _time, _people, _place)
  { 
    const event = {title: _title, note: _note, date: _date, time: _time, people: _people, place: _place};
    this.UpdateEventList(event);
  }


  public UpdateEventList(e)
  {
    let curMonth = new Date().getUTCMonth() + 1; // 0 = Januar, 1 = Februar
    let curDay = new Date().getUTCDate();

    let eDay = e.date.substring(0,2);
    let eMonth = e.date.substring(3,5);

    if (eMonth == curMonth)
    {
      let dayInt = eDay - curDay;
      if (dayInt < 5 && dayInt > -1)
      {
        this.eventsSorted[dayInt].push(e);
      }
    }
  }
}
