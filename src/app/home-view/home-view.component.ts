import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav.service';
import { DatePipe } from '@angular/common';
import { EventViewComponent } from '../event-view/event-view.component';
import { AppointmentService } from '../newAppointment.service';
import { EventService } from '../event.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})

export class HomeViewComponent implements OnInit {

  constructor(
    public eventView: EventViewComponent,
    private eventService: EventService,
    private navservice: NavService,
    private newappointmentservice: AppointmentService
  ) { }

  ngOnInit() {
    this.GetTodayDate();
    this.navservice.wasHome = true;

    // Init default values
    this.maxDays = this.GetMaxDaysOfMonth(this.curMonth);
    this.months = [this.curMonth, this.curMonth];

    this.RefreshView('home');

    //this.eventService.AddEvent("Familie", "Kaffe med Ulla", 2019, 12, 8, "12:30", "Ulla", "Torvecaféen");
  }

  FetchEvents()
  {
    this.eventService.GetAllEvents().subscribe((data: Event[]) => {
      /** setting the issue to what is being returned from the service call*/
      this.events = data;
      /** print out what is coming back from the service call */

      if (this.events.length > 0)
      {
        console.log("Found " + this.events.length + " events.");
        this.events.forEach((e) => {
      //  this.eventService.DeleteEvent(e._id).subscribe((data: Event[]) => { // DER SKAL SUBSCRIBES FØR DET SKER!!
            console.log(e.note + " d." + e.day + "/" + e.month + ", kl: " + e.time);
      //   });
        });
      }
      else
      {
        console.log("Found 0 events.");
      }
    });
  }

  events: Event[]; // holds all events found in MongoDB
  months = []; // keep track of whether we are showing the crossing of months
  maxDaysToDisplay = 5;
  daysToDisplay = this.maxDaysToDisplay;

  today = "I dag";
  public prevMonthName = "default";
  public nextMonthName = "default";

  // when changing back and forth between months
  justChangedMonthNext = false;
  justChangedMonthBack = false;

  maxDays = 31; // assume long months by default
  normMonths = [4, 6, 9, 11] // April, Juni ... have 30 days
  public eventsSorted = []; // dagene events skal ind under
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

  displayMonthName;
  displayDateName;

  GetTodayDate()
  {
    this.curDay = Number(this.dp.transform(this.date, 'd'));
    this.curWeek = Number(this.dp.transform(this.date, 'w'));
    this.curWeekday = Number(this.date.getUTCDay());
    this.curMonth = Number(this.dp.transform(this.date, 'M'));
    this.curYear = Number(this.dp.transform(this.date, 'y'));
  }

  ClearSortedEvents(){
    // clear array
    this.eventsSorted = [];
    // add indeces equal to max days to display (5 default)
    for (let i = 0; i < this.maxDaysToDisplay; i++) {
          this.eventsSorted.push([]);
    }
  }

  public UpdateEventListFive() { // _year, _month, _day
    this.ClearSortedEvents();
    let _day = this.curDay;
    let _month = this.curMonth;

    for (let i = 0; i < this.maxDaysToDisplay; i++) {
      let sepDigit = 3 // default '/' placement in date (12>/<12 vs 1/12)

      // Get Day value of the displayed dates
      if (this.dayTitles[i] == this.today)
      {
        _day = this.curDay;
      }
      else
      {
        _day = Number(this.dayTitles[i].substring(0, 2));

          if (isNaN(_day)) // Not a number means that we have substringed (>1/<12)
          {
            sepDigit = 2;
            _day = Number(this.dayTitles[i].substring(0, 1));
          }
      }
      // Get Month value of the displayed dates
      if (this.dayTitles[i] == this.today)
      {
        _month = this.curMonth;
      }
      else
      {
        _month = Number(this.dayTitles[i].substring(sepDigit, 5));

          if (isNaN(_month)) // Not a number means that we have substringed (>1/<12)
          {
            _month = Number(this.dayTitles[i].substring(sepDigit, 4));
        }
      }

      let events: Event[] = null;
      this.eventService.GetEventByDate(this.displayYear, _month, _day).subscribe((data: Event[]) => {
        events = data;
        if (events.length >= 1)
        {
          events.forEach(e => {
            let dayInt = Number(e.day) - this.displayDate; // days until event from today (e.g. 2 or 0), put into corresponding index of week view
            if (dayInt <= 4 && dayInt >= 0) {
              this.eventsSorted[dayInt].push(e);
              console.log("Found '" + e.note + "'.");
            }
          });
        }
      });
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
      newDisplayDay = this.displayDate + 5;
    }
    else if (operation == 'back')
    {
      if (this.dayTitles[0] == this.today)
      {
        newDisplayDay = this.curDay;
      }
      else
      {
        newDisplayDay = this.displayDate;
      }
    }
    else if (operation == 'home')
    {
      newDisplayDay = this.curDay;
      this.displayMonth = this.curMonth;
      this.displayYear = this.curYear;
    }
    else {
      console.log("ERROR: unknown 'operation' in 'RefreshView' (home-view-component).");
      return;
    }

    this.UpdateDayTitles(newDisplayDay, operation);
  }

  GetMaxDaysOfMonth(month)
  {
    let daysOfMonth;

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
    daysOfMonth = 31;

    // Figure out what month we are in to adjust amount of days in month
    if (month == 2)
    { // Feb has 28 ...
      daysOfMonth = 28;

      if (this.IsLeapYear()) daysOfMonth = 29; // ... unless leapyear
    }
    else // not Feb
    {
      // month is one of those with 30 days?
      this.normMonths.forEach(_month => {
        if (month == _month)
        {
          daysOfMonth = 30;
        }
      });
    }

    this.displayMonth = month;
    return daysOfMonth;
  }

  UpdateDayTitles(dayToDisplayFrom, operation){
    //console.log("justChangedNext: " + this.justChangedMonthNext + ", Date to Display from: " + dayToDisplayFrom + ", operation = " + operation)
    if (dayToDisplayFrom > this.maxDays && this.justChangedMonthNext)
    {
      //console.log("Exceeded month by: " + (dayToDisplayFrom - this.maxDays) + " days");
      dayToDisplayFrom = dayToDisplayFrom - this.maxDays;
      //console.log("New dayToDisplayFrom: " + dayToDisplayFrom);
  }

    this.dayTitles = []; // reset titles
    let j = 0; // what date to display, when going over or under the days of the month
    // ^ starts from 0 so we can check if it changed (j != 0) in either direction (prev/next month)

    let newMonth = false; // passed into another month?
    this.daysToDisplay = this.maxDaysToDisplay; // reset days to display

    if (operation == "home")
    {
      this.dayTitles.push(this.today); // For current week we wanna display "I dag";
      for (let i = 1; i < this.daysToDisplay; i++) // i = 1 due to "I dag"
      {
        if (dayToDisplayFrom + i > this.maxDays) // Moving straight into another month ?
        {
          //console.log("Moving into next month immediately, month + 1")
          operation = "next"; // change operation
          this.daysToDisplay = this.maxDaysToDisplay - i; // adjust days to display based on how many has already been displayed
          this.maxDays = this.GetMaxDaysOfMonth(this.displayMonth + 1)
          dayToDisplayFrom = 1;
          newMonth = true;
          this.justChangedMonthNext = true;
          break; // exit for-loop
        }
        else
        {
          let day = (dayToDisplayFrom + i);
          this.dayTitles.push(day + "/" + this.displayMonth);
        }
      }
    }
    // For other weeks we want to display the date.
    //  -- Future weeks -- DONE
    if (operation == "next") // not 'else if', because we want to be able to enter from code above
    {
      if (this.justChangedMonthBack)
      {
       // console.log("Next after Just moved BACK, month + 1")
        this.maxDays = this.GetMaxDaysOfMonth(this.displayMonth + 1);
        this.justChangedMonthNext = true;
        newMonth = true;
      }
      else
      {
       this.months[0] = this.displayMonth;
      }
      this.justChangedMonthBack = false;

      for (let i = 0; i < this.daysToDisplay; i++)
      {
        if (dayToDisplayFrom + i > this.maxDays) // Exceeded max days?
        {
          if (newMonth == false && this.justChangedMonthNext == false) // only do this ones
          {
           // console.log("NEXT exceeding max days, month + 1");
            this.maxDays = this.GetMaxDaysOfMonth(this.displayMonth + 1);
            newMonth = true; // moved into another month
          }

          // start from 1 for the new month
          j++;
          this.dayTitles.push(j + "/" + this.displayMonth);
        }
        else // still within max days
        {
          if (dayToDisplayFrom + i == this.curDay && this.b_WithinMonth() && this.curYear == this.displayYear)
          {
            this.dayTitles.push(this.today);
          }
          else
          {
            let day = dayToDisplayFrom + i
            this.dayTitles.push(day + "/" + this.displayMonth); // simple (e.g. 22 + 1)
          }
        }
      }

      if (newMonth && !this.justChangedMonthNext)
      {
        this.justChangedMonthNext = true;
      }
      else
      {
        this.justChangedMonthNext = false;
      }
    }
    // -- Past weeks
    else if (operation == "back")
    {
      if (this.justChangedMonthNext)
      {
        this.maxDays = this.GetMaxDaysOfMonth(this.displayMonth - 1);
        this.justChangedMonthBack = true;
        newMonth = true;
      }
      // else
      // {
      //   this.nextMonthName = this.GetMonthName(this.displayMonth);
      // }
      this.justChangedMonthNext = false;

      for (let i = this.daysToDisplay; i > 0; i--) // 'reverse' for-loop
      {

        if ((dayToDisplayFrom - i) == this.curDay && this.b_WithinMonth() && this.curYear == this.displayYear)
        {
          this.dayTitles.push(this.today);
        }
        else if (dayToDisplayFrom - i < 1) // Going into previous month?
        {
          if (!newMonth)
          {
            this.maxDays = this.GetMaxDaysOfMonth(this.displayMonth - 1); // update month
            this.months[0] = this.displayMonth;
            newMonth = true; // moved into another month
          }

          // Check for Today when moved into new month
          let day = this.maxDays + (dayToDisplayFrom - i);
          if ((day == this.curDay) && this.b_WithinMonth() && this.curYear == this.displayYear)
          {
            this.dayTitles.push(this.today);
          }
          else
          {
            this.dayTitles.push(day + "/" + this.displayMonth); // max days of month - days exceeded into new month
          }
        }
        else // still within minimum days
        {
          let day = dayToDisplayFrom - i;
          this.dayTitles.push(day + "/" + this.displayMonth); // simple (e.g. 22 - 1)
        }
      }

      if (newMonth)
      {
        this.justChangedMonthBack = true;
      }
      else
      {
        this.justChangedMonthBack = false;
      }
    }

    // Update the current displayed date variable
    if (this.dayTitles[0] == this.today)
    {
      this.displayDate = this.curDay;
    }
    else
    {
      this.displayDate = Number(this.dayTitles[0].substring(0, 2));

        if (isNaN(this.displayDate)) // Not a number means that we have substringed (>1/<12)
        {
          this.displayDate = Number(this.dayTitles[0].substring(0, 1));
        }
    }

    this.UpdateMonthHeaders();
    this.UpdateEventListFive();
  }

  UpdateMonthHeaders()
  {
    let sameMonths = 0;
    let curMonth;
    let prevMonth;

    for (let i = 1; i < this.dayTitles.length; i++) {
      prevMonth = this.dayTitles[i - 1].substring(this.dayTitles[i - 1].length - 2, this.dayTitles[i - 1].length);
      curMonth = this.dayTitles[i].substring(this.dayTitles[i].length - 2, this.dayTitles[i].length);

      if (curMonth == prevMonth)
      {
        sameMonths ++
      }
      else if (curMonth == this.today.substring(this.today.length - 2, this.today.length) // one of the days is today
        || prevMonth == this.today.substring(this.today.length - 2, this.today.length))
      {
        sameMonths++;
      }
    }

    if (sameMonths == this.maxDaysToDisplay - 1) // the same?
    {
    this.months = [this.displayMonth, this.displayMonth];
    }
    else // not the same
    {
      let firstDayMonth = this.dayTitles[0].substring(this.dayTitles[0].length - 2, this.dayTitles[0].length);
      let lastDayMonth = this.dayTitles[this.maxDaysToDisplay - 1].substring(this.dayTitles[this.maxDaysToDisplay - 1].length - 2, this.dayTitles[this.maxDaysToDisplay - 1].length);

      if (firstDayMonth.substring(0, 1) == '/') // day = 1-9 (no double digits)
      {
        this.months[0] = Number(firstDayMonth.substring(1, 2));
      }
      else if (firstDayMonth == this.today.substring(this.today.length - 2), this.today.length) // 'Today'
      {
        this.months[0] = this.displayMonth - 1;
      }
      else
      {
        this.months[0] = Number(firstDayMonth);
      }

      if (lastDayMonth.substring(0, 1) == '/')
      {
        this.months[1] = Number(lastDayMonth.substring(1, 2));
      }
      else if (firstDayMonth == this.today.substring(this.today.length - 2), this.today.length) // 'Today'
      {
        this.months[1] = this.displayMonth;
      }
      else
      {
        this.months[1] = Number(lastDayMonth);
      }
    }
    this.prevMonthName = this.GetMonthName(this.months[0]);
    this.nextMonthName = this.GetMonthName(this.months[1]);
  }

  b_WithinMonth()
  {
    if (this.curMonth == this.displayMonth) return true; // same month

    // within one month (when the crossing of months are being displayed)
    if (this.curMonth + 1 == this.displayMonth || this.curMonth - 1 == this.displayMonth)
    {
      if (this.displayDate > 28 && this.curDay < 4 || this.displayDate < 4 && this.curDay > 28)
      {
        return true;
      }
    }

    // within one month, but at year changes
    if (this.curYear != this.displayYear)
    {
      if (this.displayDate > 28 && this.curDay < 4 || this.displayDate < 4 && this.curDay > 28)
      {
        if ((this.curMonth == 12 && this.displayMonth == 1) || (this.curMonth == 1 && this.displayMonth == 12))
        {
          return true;
        }
      }
    }
    // else
    return false;
  }

  IsLeapYear()
  {
    return ((this.displayYear % 4 == 0) && (this.displayYear % 100 != 0)) || (this.displayYear % 400 == 0); // true or  false
  }
}
