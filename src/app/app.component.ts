import { Component } from '@angular/core';
import { ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { AppointmentService } from './newAppointment.service';
import { interval } from 'rxjs/observable/interval';
import { EventViewComponent } from './event-view/event-view.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { ReminderService } from './reminder.service';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Emil er fam';

  constructor(private reminderService: ReminderService, public newappointment: AppointmentService, 
    public appointmentcomponent: NewAppointmentComponent, private homeView: HomeViewComponent, private dialog: MatDialog){}

  reminderCheckInterval = 1000; // default: 45(000) (milli)seconds
  
  source = interval(this.reminderCheckInterval);
  subscribe = this.source.subscribe(lol => {
    this.ReminderCheck();
  });

  ReminderCheck()
  {
    this.reminderService.GetTodayDate();
    console.log("Checking " + this.reminderService.eventsCurWeek.length + " Days for Event Reminders")

    let s_hour = Number(this.reminderService.dp.transform(this.reminderService.date, 'HH'));
    let s_minutes = this.reminderService.dp.transform(this.reminderService.date, 'mm');

    let curTime = s_hour + ":" + s_minutes;

    // current time

    for (let day = 0; day < this.reminderService.eventsCurWeek.length; day++) { // go through each day's ... 
    console.log("Day " + day + "...")
      this.reminderService.eventsCurWeek[day].forEach(event => {                // ... event(s)
        console.log("[" + day + "] " + event.note + ", " + event.day + " (" + this.reminderService.curDay + ")")
        if (event.day == this.reminderService.curDay) // is event today?
        {
          let notifyTime = (Number(event.time.split(':')[0] - 1)).toString() + ":" + s_minutes; // eventTime - 1 hour
          if (curTime == notifyTime) // is event time an hour from now?
          {
            this.Notify(event); // notify
          }
        }
      });
    }
}

  Notify(e)
  {    
    console.log("NOTIFYING");
    let dialogRef = this.dialog.open(EventDialogComponent, {
      autoFocus: true,
      disableClose: false,

      data: {
        isNoti: true,
        id: e._id,
        type: e.type,
        note: e.note,
        year: e.year,
        month: e.month,
        day: e.day,
        time: e.time,
        people: e.people,
        place: e.place
      }
    });

    dialogRef.afterClosed().subscribe(_result => {
      const dialogResult = dialogRef.componentInstance.dialogResult;

      
    });
  }
}
