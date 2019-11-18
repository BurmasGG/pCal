import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-next-week',
  templateUrl: './next-week.component.html',
  styleUrls: ['./next-week.component.css']
})
export class NextWeekComponent implements OnInit {

  constructor(private navservice: NavService,
              private router: Router) {

    }

  ngOnInit() {
    if (this.navservice.wasHome === false) {
      this.router.navigate(['/home']);
  }
  }
}
