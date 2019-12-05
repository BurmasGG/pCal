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
import { EventService } from './event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Emil er fam';

  constructor(private reminderService: ReminderService, public newappointment: AppointmentService, public eventService: EventService,
    public appointmentcomponent: NewAppointmentComponent, private homeView: HomeViewComponent, private dialog: MatDialog){}

  reminderCheckInterval = 45000; // default: 45(000) (milli)seconds
  
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

    // current time
    let curTime = s_hour + ":" + s_minutes;

    for (let day = 0; day < this.reminderService.eventsCurWeek.length; day++) { // go through each day's ... 
      this.reminderService.eventsCurWeek[day].forEach(event => {                // ... event(s)
        if (event.day == this.reminderService.curDay) // is event today?
        {
          // basically split time (e.g. "12:30") between ':', substract 1 from hour and reassemble
          let notifyTime = (Number(event.time.split(':')[0] - 1)).toString() + ":" + event.time.split(':')[1];
          if (curTime == notifyTime && event.notify == true) // is event time an hour from now and haven't already notified?
          {  
            console.log("curTime == notifyTime (" + curTime + " == " + notifyTime +")");
            // update database to not notify for this anymore
            this.eventService.UpdateEvent(event._id, false, event.type, event.note, event.year, event.month, event.day, event.time, event.people, event.place).subscribe((data: any) => {
              event.notify = false; // update local array event as well
              this.Notify(event); // notify
            });
          }
        }
      });
    }
  }

  Notify(e)
  {    
    this.eventService.StartLights().subscribe((data: any) => {
      // needs 'subscribe' or else nothing happens.
    });

    // Audio Notification not used -- no speaker (REPLACE SOUND FILE)
    // let audio = new Audio();
    // audio.src = "../assets/sounds/notification.mp3";
    // audio.load();
    // audio.play();

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
        
      this.eventService.StopLights().subscribe((data: any) => {
        // needs 'subscribe' or else nothing happens.
      });
    });
  }
}
