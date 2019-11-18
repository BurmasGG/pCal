import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {

  constructor(private navservice: NavService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.navservice.wasHome === false) {
      this.router.navigate(['/home']);
    }
  }

}
