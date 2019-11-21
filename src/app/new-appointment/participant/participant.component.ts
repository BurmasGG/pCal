import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/nav.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {
  participants = new FormControl();

  participantList: string[] = ['Ulla', 'Oliver', 'Chatrine'];

  constructor(public navservice: NavService) { }

  ngOnInit() {
  }
  buttonClicked() {
    this.navservice.Toggle = 5;
  }
}
