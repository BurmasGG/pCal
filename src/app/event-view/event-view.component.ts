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
        year: t.year,
        month: t.month,
        day: t.day,
        time: t.time,
        people: t.people,
        place: t.place
      }
    });

    dialogRef.afterClosed().subscribe(_result => {
      const dialogResult = dialogRef.componentInstance.dialogResult;

      if (dialogResult == "delete")
      {
        alert('"Sikker på du vil slette?"-besked her.');
      }
      else if (dialogResult == "edit")
      {
        alert('Start "new appointment" ting.');
      }
    });
  }

  public EditEvent(day, event, eventList, week = "")
  {
    let t = this.SetT(day, event, eventList, week);
    alert('Smid info over til "new appointment" wizard\n' + t.note + ", " + t.day + "/" + t.month + "/" + t.year);
  }

  public DeleteEvent(day, event, eventList, week = "")
  {
    let t = this.SetT(day, event, eventList, week);
    alert('Sikker på du vil slette "' + t.note + '"? besked ting.');
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
