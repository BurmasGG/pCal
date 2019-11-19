import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/nav.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {

  constructor(public navservice: NavService) { }

  ngOnInit() {
  }
  buttonClicked() {
    this.navservice.Toggle = 5;
}
}
