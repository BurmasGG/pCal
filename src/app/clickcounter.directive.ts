import { Directive, HostListener, EventEmitter } from '@angular/core';
import { EventService } from './event.service';

@Directive({
  selector: '[dirClickcounter]'
})
export class ClickcounterDirective {

  constructor(private eventService: EventService) { }

  @HostListener('mouseup', ['$event'])
  UpdateClickCounter(data = "")
  {
    this.eventService.UpdateClickcounter().subscribe((data: any) => {
      // needs 'subscribe' or else nothing happens.
      console.log("Updating click: " + data['event'])
    });

    this.eventService.PrintData().subscribe((data: any) => {
      let eventAmount = 0;
      for (let index = 0; index < data.length; index++) {
        eventAmount += 1;
      }

      console.log("Total amount of events: " + eventAmount);
    });
  }

}
