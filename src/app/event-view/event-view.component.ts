import { Component, Injector, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import { EventService } from '../event.service';
import { NewAppointmentComponent } from '../new-appointment/new-appointment.component';
import { Router } from '@angular/router';
import { AppointmentService } from '../newAppointment.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})

export class EventViewComponent {

  constructor(public dialog: MatDialog, private injector: Injector, private eventService: EventService,
    private router: Router, private appService: AppointmentService) { }

  e; // hold event
  public eventInfo: string = ""; // send info to NewAppointment

  // Få dag, event, array af events, og (hvis det er uge/månedsvisning) uge nummer
  public ShowEvent(day, event, eventList, week = "") // 'week' er optional; så er det 5 dagsvisning
  {
    this.e = this.GetEvent(day, event, eventList, week); // custom function til at sætte T

    let dialogRef = this.dialog.open(EventDialogComponent, {
      autoFocus: true,
      disableClose: false,

      data: {
        isNoti: 'false',
        id: this.e._id,
        notify: this.e.notify,
        type: this.e.type,
        note: this.e.note,
        year: this.e.year,
        month: this.e.month,
        day: this.e.day,
        time: this.e.time,
        people: this.e.people,
        place: this.e.place
      }
    });

    dialogRef.afterClosed().subscribe(_result => {
      const dialogResult = dialogRef.componentInstance.dialogResult; // result received from "event dialog"

      if (!isNullOrUndefined(dialogResult)) {
        
        let confirmRef = this.dialog.open(EventDialogComponent, {
          autoFocus: true,
          disableClose: false,
    
          data: {
            isNoti: dialogResult,
            id: this.e._id,
            note: this.e.note,
            month: this.e.month,
            day: this.e.day,
            type: this.e.type
          }
        });

        confirmRef.afterClosed().subscribe(_result => {
          const confirmResult = confirmRef.componentInstance.dialogResult; // result received from "event dialog"

          if (confirmResult == "del_yes") 
          {
            this.eventService.DeleteEvent(this.e._id).subscribe((data: Event[]) => {
            console.log(data);
            window.location.reload();
            });
          }
          else if (confirmResult == "edit_yes")
          {
            this.appService.SetValues(this.e); // parse event values
            this.router.navigate(['/makeAppointment']);
          }
        });
      }
    });
  }

  // Hvis 'week' er angivet er det månedsvisning og vi skal hente >event< under >day<, under >week<
  GetEvent(day, event, eventList, week) {
    let e;

    if (week) { // uge/månedsvisning
      e = eventList[week][day][event];
    }
    else // 5-dags visning
    {
      e = eventList[day][event];
    }

    return e;
  }

}
