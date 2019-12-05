import { Component, Injector, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import { EventService } from '../event.service';
import { NewAppointmentComponent } from '../new-appointment/new-appointment.component';
import { Router } from '@angular/router';
import { AppointmentService } from '../newAppointment.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})

export class EventViewComponent {
  @Output() eventEmitter = new EventEmitter<string>();

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
        isNoti: false,
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
      const dialogResult = dialogRef.componentInstance.dialogResult;

      if (dialogResult == "delete") {
        if (confirm("Sikker på du vil slette '" + this.e.note + "'?")) {
          this.eventService.DeleteEvent(this.e._id).subscribe((data: Event[]) => {
            console.log(data);
            window.location.reload();
          });
        }
      }
      else if (dialogResult == "edit") {
        if (confirm("Sikker på du vil lave ændringer i '" + this.e.note + "'?")) {
          // call newAppointment med bool "editing = true" og this.e._id;
          //this.eventInfo = "true-" + this.e._id + "-" + this.e.type + "-" + this.e.note + "-" + this.e.year + "-" + this.e.month + "-" + this.e.day  + "-" + this.e.people  + "-" + this.e.place;
          this.appService.SetValues(this.e);
          this.router.navigate(['/makeAppointment']);
        }
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
