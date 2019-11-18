import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/nav.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  constructor(public navservice: NavService) { }

  ngOnInit() {
  }
  buttonClicked() {
    this.navservice.Toggle = 4;
}
}
