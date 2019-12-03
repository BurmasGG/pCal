import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav.service';
import {Router} from '@angular/router';
import { HomeViewComponent } from '../home-view/home-view.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private name = '';


  constructor(
    private navservice: NavService,
    private router: Router,
    public homeview: HomeViewComponent
  ) { }

  ngOnInit() {
  }
  routeToAppointment() {
    this.router.navigate(['/makeAppointment']);
  }
  routeToHome() {
    this.router.navigate(['/home']);
  }
  routeToNextWeek() {
    this.router.navigate(['/nextWeek']);
  }
  makeCodeNotTrash(){
    this.homeview.RefreshView('next');
  }
}

