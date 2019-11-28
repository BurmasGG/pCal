import { Injectable } from '@angular/core';
// Imports the HttpClient from the 'http library' to  be injected into the 'EventService' class constructor
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EventService {
/** a variable called 'uri' of type string to contain the localhost port the nodejs server is running on */
  uri = 'http://localhost:4000';
/** To make the httpclient available inside the IssueService class */
  constructor(private http: HttpClient) { }

  GetEvents(){
    /** sending out an HTTP get request to the url, returning all the events in .json format*/
    return this.http.get(`${this.uri}/events`);
  }

  GetEventById(id) {
    return this.http.get(`${this.uri}/events/${id}`);
  }

  AddEvent(_title, _note, _date, _time, _people = "", _place = "") {
    const event = { title: _title, note: _note, date: _date, time: _time, people: _people, place: _place};
    /** Initiating the post request using the post method
      what being returned is return by the add events method */
    return this.http.post(`${this.uri}/events/add`, event);
  }

/** To know which existing event to update the 'id' and 'status' is added as parameters
all paramter are containing the new values */
  UpdateEvent(id, _title, _note, _date, _time, _people = "", _place = "") {
    const event = { title: _title, note: _note, date: _date, time: _time, people: _people, place: _place };
    /** post request is send to the events, where the 'id' value is inserted, also containing the event object with updated data */
    return this.http.post(`${this.uri}/events/update/${id}`, event);
  }
  
/** the delete method is taking 'id' as a parameter  */
  DeleteEvent(id) {
    console.log("Deleting (" + id + ")");
    return this.http.get(`${this.uri}/events/delete/${id}`);
  }
}