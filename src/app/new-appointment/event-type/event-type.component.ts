import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/nav.service';

@Component({
  selector: 'app-event-type',
  templateUrl: './event-type.component.html',
  styleUrls: ['./event-type.component.css']
})
export class EventTypeComponent implements OnInit {

  constructor(private navservice: NavService) { }

  ngOnInit() {
  }
  buttonClicked() {
    this.navservice.Toggle = 1;
  }
}
