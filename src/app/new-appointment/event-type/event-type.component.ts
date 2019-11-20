import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavService } from 'src/app/nav.service';

@Component({
  selector: 'app-event-type',
  templateUrl: './event-type.component.html',
  styleUrls: ['./event-type.component.css']
})
export class EventTypeComponent implements OnInit, AfterViewInit {
  classname = 'famImg';
  public pickedFam = false;
  public pickedSCN = false;
  public pickedHealth = false;
  public pickedBall = false;
  public isChecked = false;

  constructor(private navservice: NavService) { }

  public chosenCat = "";

  objSCN; objFam; objHealth; objBall;

  ngOnInit() {
  }
  buttonClicked() {
    this.navservice.Toggle = 1;
  }

  ngAfterViewInit(){
    this.objSCN = document.getElementById('SCNImg');
    this.objFam = document.getElementById('famImg');
    this.objHealth = document.getElementById('healthImg');
    this.objBall = document.getElementById('ballImg');
  }

  pickFam() {
    this.objSCN.id = 'SCNImg';
    this.objBall.id = 'ballImg';
    this.objFam.id = 'fluebenImg';
    this.objHealth.id = 'healthImg';
  }
  pickSCN() {
    this.objSCN.id = 'fluebenImg';
    this.objBall.id = 'ballImg';
    this.objFam.id = 'famImg';
    this.objHealth.id = 'healthImg';
  }

  pickHealth() {
    this.objSCN.id = 'SCNImg';
    this.objBall.id = 'ballImg';
    this.objFam.id = 'famImg';
    this.objHealth.id = 'fluebenImg';
  }
  pickBall() {
    this.objSCN.id = 'SCNImg';
    this.objBall.id = 'fluebenImg';
    this.objFam.id = 'famImg';
    this.objHealth.id = 'healthImg';
  }
  if(isChecked = true) {


  }
}
