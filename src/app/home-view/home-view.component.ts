import { Component, OnInit  } from '@angular/core';
import { NavService } from '../nav.service';
import { DatePipe } from '@angular/common';
import { EventViewComponent } from '../event-view/event-view.component';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})

export class HomeViewComponent implements OnInit {

  constructor(
    private navservice: NavService,
    private eventView: EventViewComponent, 
  ) { }

  ngOnInit() {
    this.navservice.wasHome = true;
    this.RefreshView('home');
    this.AddEvent("Dette er en test", "En rigtig fin beskrivelse", "21-11-2019", "12:30", "person", "sted");
  }

  normMonths = [4, 6, 9, 11] // April, Juni ... have 30 days
  daysToDisplay = 5;
  // 5 day view -- update this if changing to 7 day view (or even remove)
  stringsTodayView = ["I dag", "I morgen"];
  public eventsSorted = [[], [], [], [], []]; // dagene events skal ind under

  public dayTitles = [];

  // week view
  date = new Date();
  dp = new DatePipe('en-DK');
  public curDay = Number(this.dp.transform(this.date, 'd'));
  public curWeek = Number(this.dp.transform(this.date, 'w'));
  public curWeekday = Number(this.date.getUTCDay());
  public curMonth = Number(this.dp.transform(this.date, 'M'));
  public curYear = Number(this.dp.transform(this.date, 'y'));

  displayDate = this.curDay;
  displayMonth = this.curMonth;
  displayYear = this.curYear;

  public AddEvent(_title, _note, _date, _time, _people = "", _place = "") {
    const event = { title: _title, note: _note, date: _date, time: _time, people: _people, place: _place };
    this.UpdateEventListFive(event);
  }

  public UpdateEventListFive(e) {    
    this.curDay = Number(this.dp.transform(this.date, 'd'));
    this.curWeek = Number(this.dp.transform(this.date, 'w'));
    this.curWeekday = Number(this.date.getUTCDay());
    this.curMonth = Number(this.dp.transform(this.date, 'M'));
    this.curYear = Number(this.dp.transform(this.date, 'y'));

    let eDay = Number(e.date.substring(0, 2)); // the '+' symbol parses the following string to an integer (type 'number')
    let eMonth = Number(e.date.substring(3, 5));

    if (eMonth == this.curMonth) {
      let dayInt = this.curDay - eDay;
      if (dayInt < 5 && dayInt > -1) {
        this.eventsSorted[dayInt].push(e);
      }
    }
  }

  RefreshView(operation)
  {
    let newDisplayDay;

    console.log("Refreshing View ...");
    if (operation == 'next')
    {
      console.log("Next week");
      newDisplayDay = this.dayTitles[this.dayTitles.length - 1] + 1
    }
    else if (operation == 'back')
    {
      console.log("Prior week");
      if (this.dayTitles[0] == this.stringsTodayView[0])
      {
        console.log("BACK FROM PRIOR WEEK")
        newDisplayDay = this.curDay;
      }
      else
      {
        newDisplayDay = this.dayTitles[0];

        console.log("Normal prior week, displayDay: " + this.dayTitles[0]);
      }
    }
    else if (operation == 'home')
    {
      console.log("This week");
      newDisplayDay = this.curDay;
      this.displayMonth = this.curMonth;
      this.displayYear = this.curYear;
    }
    else
    {
      console.log("ERROR: unknown 'operation' in 'RefreshView' (home-view-component).");
      return;
    }

    this.UpdateDayTitles(newDisplayDay, operation);
  }

  GetMaxDaysOfMonth(month)
  {
    if (month > 12 )
    {
      month = 1;
      this.displayYear++;
    } 
    else if (month < 1)
    {
      month = 12;
      this.displayYear--;
    }

    // Assume its a long month
    let maxDays = 31;

    // Figure out what month we are in to adjust amount of days in month
    if (month == 2)
    {
      maxDays = 28;

      if (this.IsLeapYear()) maxDays = 29;
    }
    else
    {
      this.normMonths.forEach(_month => {
        if (month == _month)
        {
          maxDays = 30;
        } 
      });
    }

    this.displayMonth = month;
    console.log("Days in Month (" + this.displayMonth + "): " + maxDays);

    return maxDays;
  }

  UpdateDayTitles(dayToDisplayFrom, operation){
    this.dayTitles = []; // reset titles

    let maxDays = this.GetMaxDaysOfMonth(this.displayMonth); // 28, 30, or 31 days in month?
    let j = 0; // what date to display, when going over or under the days of the month
    // ^ starts from 0 so we can check if it changed (j != 0) in either direction (prev/next month)

    // For current week we wanna display (today, tomorrow, etc);
    if (operation == "home")
    {
      console.log("Viewing CURRENT week");
      for (let i = 0; i < this.daysToDisplay; i++) 
      {
        if (i < 2) 
        {
          this.dayTitles.push(this.stringsTodayView[i]);
        }
        else
        {
          this.dayTitles.push(dayToDisplayFrom + i);
        }
      }
    }
    // For other weeks we want to display the date.
    //  -- Future weeks -- DONE
    else if (operation == "next")
    {
      console.log("Viewing NEXT week");
      let newMonth = false; // passed into another month?
      for (let i = 0; i < this.daysToDisplay; i++) 
      {
        if (dayToDisplayFrom + i > maxDays) // Exceeded max days?
        {
          newMonth = true; // moved into another month
          j++; // starts from 1 for the new month
          this.dayTitles.push(j);
        }
        else // still within max days
        {
          this.dayTitles.push(dayToDisplayFrom + i); // simple (e.g. 22 + 1)
        }
      }

    if (newMonth) maxDays = this.GetMaxDaysOfMonth(this.displayMonth + 1); // update month
    }
    // -- Past weeks
    else if (operation == "back")
    {
      console.log("Viewing PREVIOUS week");
      console.log("start date: " + dayToDisplayFrom);
      let newMonth = false; // passed into another month?
      for (let i = this.daysToDisplay; i > 0; i--) // 'reverse' for-loop
      {
        if (dayToDisplayFrom - i < 1) // Going into previous month?
        {
          console.log("FIX: " + dayToDisplayFrom + " - " + i + " = " + (dayToDisplayFrom - i));
          if (newMonth == false) 
          {
            maxDays = this.GetMaxDaysOfMonth(this.displayMonth - 1);
            newMonth = true; // moved into another month
          }

          this.dayTitles.push(maxDays + (dayToDisplayFrom - i)); // max days of month - days exceeded into new month
        }
        else // still within minimum days
        {
          console.log("Normal: " + (dayToDisplayFrom - i));
          this.dayTitles.push(dayToDisplayFrom - i); // simple (e.g. 22 - 1)
        }
      }

      //if (newMonth) maxDays = this.GetMaxDaysOfMonth(this.displayMonth - 1); // update month
    } 

    // Update the current displayed date variable
    if (this.dayTitles[0] == this.stringsTodayView[0])
    {
      this.displayDate = this.curDay;
    }
    else if (j != 0)
    {
      this.displayDate = j;
    }
    else
    {
      this.displayDate = this.dayTitles[0];
    }
  }

  IsLeapYear()
  {
    return ((this.displayYear % 4 == 0) && (this.displayYear % 100 != 0)) || (this.displayYear % 400 == 0); // true or  false
  }

}
