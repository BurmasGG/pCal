import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateComponent } from './date.component';

import {Component} from '@angular/core';

describe('DateComponent', () => {
  let component: DateComponent;
  let fixture: ComponentFixture<DateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


/** @title Datepicker touch UI */
@Component({
  selector: 'date.component',
  templateUrl: 'date.component.html',
  styleUrls: ['date.component.css'],
})
export class date {}