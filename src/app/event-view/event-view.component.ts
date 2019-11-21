import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent {

  constructor(public dialog: MatDialog, private injector: Injector) { }

  result = "";

  // Få dag, event, array af events, og (hvis det er uge/månedsvisning) uge nummer
  public ShowEvent(day, event, eventList, week = "") // 'week' er optional; så er det 5 dagsvisning
  {
    let t = this.SetT(day, event, eventList, week); // custom function til at sætte T

    let dialogRef = this.dialog.open(EventDialogComponent, {
      autoFocus: true,
      disableClose: false,

      data:{
        title: t.title,
        note: t.note,
        date: t.date,
        time: t.time,
        people: t.people,
        place: t.place,
        result: ""
      }
    });

    dialogRef.afterClosed().subscribe(_result => {
      this.result = dialogRef.componentInstance.dialogResult;

      if (this.result == "delete")
      {
        alert('"Sikker på du vil slette?"-besked her.');
      }
      else if (this.result == "edit")
      {
        alert('Start "new appointment" ting.');
      }
  });
  }

  public EditEvent(day, event, eventList, week = "")
  {
    let t = this.SetT(day, event, eventList, week);
    alert('Smid info over til "new appoiintmen" wizard\n' + t.title + ", " + t.date);
  }

  public DeleteEvent(day, event, eventList, week = "")
  {
    let t = this.SetT(day, event, eventList, week);
    alert('Sikker på du vil slette "' + t.title + '"? besked ting.');
  }

  // Hvis 'week' er angivet er det månedsvisning og vi skal hente >event< under >day<, under >week<
  SetT(day, event, eventList, week)
  {
    let t;

    if (week) { // uge/månedsvisning
      t = eventList[week][day][event];
    }
    else // 5-dags visning
    {
      t = eventList[day][event];
    }

    return t;
  }

}
