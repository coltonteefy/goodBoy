import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment'
import 'rxjs/add/operator/map'
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class CalendarEventsService {
  isFinished:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  tmpHoldValue = [
    {
      time: [],
      pet: [],
      date: [],
      task: []
    }
  ];
  events = [
    {
      time: [],
      pet: [],
      date: [],
      task: []
    }
  ];

  constructor(private http:HttpClient) {
  }

  getEvents() {
    this.events = [
      {
        time: [],
        pet: [],
        date: [],
        task: []
      }
    ];

    return this.http.get('./assets/calendar-events.json')
      .map((data:{event:any[]}) => data.event)
      .subscribe(event => {
        for (let i = 0; i < event.length; i++) {
          this.events[0].time.push(event[i].time);
          this.events[0].pet.push(event[i].pet);
          this.events[0].date.push(event[i].date);
          this.events[0].task.push(event[i].task);
        }

        if(this.tmpHoldValue[0].date.length != 0) {
          for (let i = 0; i < this.tmpHoldValue[0].date.length; i++) {
            this.events[0].time.push(this.tmpHoldValue[0].time[i]);
            this.events[0].pet.push(this.tmpHoldValue[0].pet[i]);
            this.events[0].date.push(this.tmpHoldValue[0].date[i]);
            this.events[0].task.push(this.tmpHoldValue[0].task[i]);
          }
        }

        this.isFinished.next(true);
      })
  }

  formatDate(date:any) {
    date = moment(date).format('YYYY-MM-DD');
    return date;
  }

  dayFormat(day:any) {
    day = moment().format('D');
    return day;
  }
}
