import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/nav.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  constructor(public navservice: NavService) { }

  ngOnInit() {
  }
  buttonClicked() {
    this.navservice.Toggle = 4;
  }
}
