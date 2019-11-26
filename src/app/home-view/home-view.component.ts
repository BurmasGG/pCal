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
    public eventView: EventViewComponent, 
  ) { }

  ngOnInit() {
    this.navservice.wasHome = true;

    this.AddEvent("Dette er en test", "En rigtig fin beskrivelse", "21-11-2019", "12:30", "person", "sted");

    this.GetMaxDaysOfMonth(this.curMonth);
    this.prevMonthName = this.GetMonthName(this.curMonth);
    this.nextMonthName = this.GetMonthName(this.curMonth);

    this.RefreshView('home');
  }

  today = "I dag";
  public prevMonthName = "default";
  public nextMonthName = "default";

  // Fixes for when changing back and forth between months
  justChangedMonthNext = false;
  justChangedMonthBack = false;

  maxDays = 31; // assume long months bu default
  normMonths = [4, 6, 9, 11] // April, Juni ... have 30 days
  maxDaysToDisplay = 5;
  public eventsSorted = [[], [], [], [], []]; // dagene events skal ind under
  public dayTitles = [];

  daysToDisplay = this.maxDaysToDisplay;

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

  displayMonthName;
  displayDateName;

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

  GetMonthName(month)
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

    switch (month)
    {
      case 1:
        month = "Januar";
        break;
      case 2:
        month = "Februar";
        break;
      case 3:
        month = "Marts";
        break;
      case 4:
        month = "April";
        break;
      case 5:
        month = "Maj";
        break;
      case 6:
        month = "Juni";
        break;
      case 7:
        month = "Juli";
        break;
      case 8:
        month = "August";
        break;
      case 9:
        month = "September";
        break;
      case 10:
        month = "Oktober";
        break;
      case 11:
        month = "November";
        break;
      case 12:
        month = "December";
        break;
    }

    return month;
  }

  RefreshView(operation)
  {
    let newDisplayDay;

    if (operation == 'next')
    {
      newDisplayDay = this.dayTitles[this.dayTitles.length - 1] + 1
    }
    else if (operation == 'back')
    {
      if (this.dayTitles[0] == this.today)
      {
        newDisplayDay = this.curDay;
      }
      else
      {
        newDisplayDay = this.dayTitles[0];
      }
    }
    else if (operation == 'home')
    {
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
    this.maxDays = 31;

    // Figure out what month we are in to adjust amount of days in month
    if (month == 2)
    { // Feb has 28 ...
      this.maxDays = 28;

      if (this.IsLeapYear()) this.maxDays = 29; // ... unless leapyear
    }
    else // not Feb
    {
      // month is one of those with 30 days?
      this.normMonths.forEach(_month => {
        if (month == _month)
        {
          this.maxDays = 30;
        }
      });
    }

    // if (this.displayMonth < month)
    // {
    //   console.log(this.displayMonth + " < " + month + " -- updating Next Month Name");
    //   this.nextMonthName = this.GetMonthName(month)
    // }
    // else if (this.displayMonth > month)
    // {
    //   console.log(this.displayMonth + " > " + month + " -- updating Prev Month Name");
    //   this.prevMonthName = this.GetMonthName(month);
    // }
    // else
    // {
    //   console.log(this.displayMonth + " == " + month + " -- updating Both Month Names");
    //   this.nextMonthName = this.GetMonthName(month);
    //   this.prevMonthName = this.GetMonthName(month);
    // }

    this.displayMonth = month;
    console.log("Days in Month (" + this.displayMonth + "): " + this.maxDays);
  }

  UpdateDayTitles(dayToDisplayFrom, operation){
    console.log("Date to Display from: " + dayToDisplayFrom + ", operation = " + operation)
    this.dayTitles = []; // reset titles
    let j = 0; // what date to display, when going over or under the days of the month
    // ^ starts from 0 so we can check if it changed (j != 0) in either direction (prev/next month)

    let newMonth = false; // passed into another month?
    this.daysToDisplay = this.maxDaysToDisplay; // reset days to display

    if (operation == "home")
    {
      this.dayTitles.push(this.today); // For current week we wanna display "I dag";
      for (let i = 1; i < this.daysToDisplay; i++) // start from 1 due to "I dag"
      {
        if (dayToDisplayFrom + i > this.maxDays) // Moving straight into another month ?
        {
          operation = "next"; // change operation
          this.daysToDisplay = this.maxDaysToDisplay - i; // adjust days to display based on how many has already been displayed
          dayToDisplayFrom = 1;
          newMonth = true;
          this.nextMonthName = this.GetMonthName(this.displayMonth + 1)
          break; // exit for-loop
        }
        else
        {
          this.dayTitles.push(dayToDisplayFrom + i);
        }
      }
    }
    // For other weeks we want to display the date.
    //  -- Future weeks -- DONE
    if (operation == "next") // not 'else if', because we want to be able to update above
    {
      if (this.justChangedMonthBack)
      {
        this.GetMaxDaysOfMonth(this.displayMonth + 1);
        this.justChangedMonthNext = true;
        newMonth = true;
      }
      else
      {
        this.prevMonthName = this.GetMonthName(this.displayMonth);
      }

      this.justChangedMonthBack = false;

      for (let i = 0; i < this.daysToDisplay; i++)
      {
        if (dayToDisplayFrom + i > this.maxDays) // Exceeded max days?
        {
          newMonth = true; // moved into another month

          // start from 1 for the new month
          j++;
          this.dayTitles.push(j);
        }
        else // still within max days
        {
          if (dayToDisplayFrom + i == this.curDay && this.b_WithinMonth() && this.curYear == this.displayYear)
          {
            this.dayTitles.push(this.today);
          }
          else
          {
            this.dayTitles.push(dayToDisplayFrom + i); // simple (e.g. 22 + 1)
          }
        }
      }

      if (newMonth && !this.justChangedMonthNext)
      {
        this.GetMaxDaysOfMonth(this.displayMonth + 1); // only increase month if we haven't already
        this.justChangedMonthNext = true; // when we press "Back" next time we will switch back to previous month
      }
      else
      {
        this.justChangedMonthNext = false;
      }

      this.nextMonthName = this.GetMonthName(this.displayMonth);
    }
    // -- Past weeks
    else if (operation == "back")
    {
      if (this.justChangedMonthNext)
      {
        console.log("Just moved one month forward, SO MOVE ONE BACK");
        this.GetMaxDaysOfMonth(this.displayMonth - 1);
        this.justChangedMonthBack = true;
        newMonth = true;
      }
      else
      {
        this.nextMonthName = this.GetMonthName(this.displayMonth);
      }
      this.justChangedMonthNext = false;

      for (let i = this.daysToDisplay; i > 0; i--) // 'reverse' for-loop
      {
        console.log("Current date: " + (dayToDisplayFrom - i) + " (" + this.curDay + ")");

        if ((dayToDisplayFrom - 1) == this.curDay && this.b_WithinMonth() && this.curYear == this.displayYear)
        {
          this.dayTitles.push(this.today);
        }
        else if (dayToDisplayFrom - i < 1) // Going into previous month?
        {
          if (!newMonth)
          {
            console.log("!newMonth, - 1")
            this.GetMaxDaysOfMonth(this.displayMonth - 1); // update month
            newMonth = true; // moved into another month
          }

          // Check for Today when moved into new month
          if (this.maxDays + (dayToDisplayFrom - i) == this.curDay && this.b_WithinMonth() && this.curYear == this.displayYear)
          {
            this.dayTitles.push(this.today);
          }
          else
          {
            this.dayTitles.push(this.maxDays + (dayToDisplayFrom - i)); // max days of month - days exceeded into new month
          }
        }
        else // still within minimum days
        {
          this.dayTitles.push(dayToDisplayFrom - i); // simple (e.g. 22 - 1)
          console.log("Adding " + (dayToDisplayFrom - i));
        }
        console.log("i: " + i);
      }

      if (newMonth)
      {
        this.justChangedMonthBack = true;
      }
      else
      {
        this.justChangedMonthBack = false;
      }

      this.prevMonthName = this.GetMonthName(this.displayMonth);
    }

    // Update the current displayed date variable
    if (this.dayTitles[0] == this.today)
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

  b_WithinMonth()
  {
    if (this.curMonth == this.displayMonth) return true; // same month

    // within one month (when the crossing of months are being displayed)
    if (this.curMonth + 1 == this.displayMonth || this.curMonth - 1 == this.displayMonth) return true;

    // within one month, but at year changes
    if (this.curYear != this.displayYear)
    {
     if ((this.curMonth == 12 && this.displayMonth == 1) || (this.curMonth == 1 && this.displayMonth == 12)) return true;
    }

    // else
    return false;
  }

  IsLeapYear()
  {
    return ((this.displayYear % 4 == 0) && (this.displayYear % 100 != 0)) || (this.displayYear % 400 == 0); // true or  false
  }

}
