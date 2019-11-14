import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Month.ViewComponent } from './month.view.component';

describe('Month.ViewComponent', () => {
  let component: Month.ViewComponent;
  let fixture: ComponentFixture<Month.ViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Month.ViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Month.ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
