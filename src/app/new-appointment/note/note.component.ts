import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/nav.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor(public navservice: NavService) {

  }

  ngOnInit() {
  }
  buttonClicked() {
    this.navservice.Toggle = 2;
  }
}
