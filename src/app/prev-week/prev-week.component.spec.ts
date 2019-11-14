import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevWeekComponent } from './prev-week.component';

describe('PrevWeekComponent', () => {
  let component: PrevWeekComponent;
  let fixture: ComponentFixture<PrevWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
