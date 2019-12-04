import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeViewComponent } from '../home-view/home-view.component';
import { EventService } from '../event.service';
import { AppointmentService } from '../newAppointment.service';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})

export class EventDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private eventservice: AppointmentService,) {
  }

  // Looking for customization?
  // For default customization of the window go to app.module.ts and look under 'providers'

  // for content customization go to event-dialog.component.css or .html

  public dialogResult;

  ReturnResult(_result)
  {
    this.dialogResult = _result;
  }
}
