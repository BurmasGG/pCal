import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/nav.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  constructor(
              public navservice: NavService
  ) { }

  ngOnInit() {
  }
buttonClicked() {
  this.navservice.Toggle = 1;
}
}
