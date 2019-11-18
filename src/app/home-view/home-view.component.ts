import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  constructor(private navservice: NavService) { }

  ngOnInit() {
    this.navservice.wasHome = true;
  }

}
