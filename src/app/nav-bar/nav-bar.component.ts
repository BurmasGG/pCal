import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav.service';
import {Router} from '@angular/router';
import { HomeViewComponent } from '../home-view/home-view.component';
import { NewAppointmentComponent } from '../new-appointment/new-appointment.component';
import { AppointmentService } from '../newAppointment.service';

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
    public homeview: HomeViewComponent,
    private appService: AppointmentService
  ) { }

  ngOnInit() {
  }
  
  routeToAppointment() {
    this.router.navigate(['/makeAppointment']);
  }
  routeToHome() {
    this.router.navigate(['/home']);
    this.appService.clearAll();
  }
  routeToNextWeek() {
    this.router.navigate(['/nextWeek']);
    this.appService.clearAll();
  }
}

