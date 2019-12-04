import { Component } from '@angular/core';
import { ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { AppointmentService } from './newAppointment.service';
import { interval } from 'rxjs/observable/interval';
import { EventViewComponent } from './event-view/event-view.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { ReminderService } from './reminder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Emil er trash';
constructor(private reminderService: ReminderService, public newappointment: AppointmentService, public appointmentcomponent: NewAppointmentComponent, private homeView: HomeViewComponent){}

  source = interval(1000);
  subscribe = this.source.subscribe(lol => {
    this.ReminderCheck();
  });

  ReminderCheck()
  {
    this.reminderService.GetTodayDate();
    console.log("Checking " + this.reminderService.eventsCurWeek.length + " Event Reminders")

    let s_hour = Number(this.reminderService.dp.transform(this.reminderService.date, 'HH'));
    let s_minutes = this.reminderService.dp.transform(this.reminderService.date, 'mm');

    // current time
    let curTime = s_hour + ":" + s_minutes;

    // current time - 1 hour
    let notifyTime = (Number(s_hour - 1)).toString() + ":" + s_minutes;

    for (let day = 0; day < this.reminderService.eventsCurWeek.length; day++) {
      this.reminderService.eventsCurWeek[day].forEach(event => {
        if (event.day == this.reminderService.curDay)
        {
          if (event.time == notifyTime)
          {
            this.Notify(event);
          }
        }
        else
        {
          if (event.time == curTime)
          {
            this.Remind(event);
          }
        }
      });
    }
}

  Remind(e)
  {
    console.log("Minder dig lige om " + e.note + ", d. " + e.day + " kl. " + e.time)
  }

  Notify(e)
  {
    console.log("Begivenhed om en time: " + e.note)
  }

}
