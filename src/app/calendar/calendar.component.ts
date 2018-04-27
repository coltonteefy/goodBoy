import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map'
import {CalendarEventsService} from "../services/calendar-events.service";
import * as moment from 'moment'
import {PetInfoService} from "../services/pet-info.service";
import { Router } from '@angular/router';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  shortHand = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  date = new Date();
  monthNum = new Date().getMonth();
  today = new Date().getDate();
  currentYear = new Date().getFullYear();
  dow = new Date().getDay();
  firstOfMonth = new Date(this.date.getFullYear(), this.monthNum, 1);
  numOfDays:number;
  numEachMonth = [];
  addYearTracker = 0;
  dateEventList = [];
  taskEventList = [];
  eventDataCollection = [
    {
      day: [],
      formattedDate: [],
      task: []
    }
  ];
  mouseOver = false;
  boxIndex = -1;
  newEvent = "";
  timeOfEvent = "";
  petName = [];
  petInfoList = [];
  tmpPicHolder = [];
  eventViewOpen = false;
  petsInvolved = [];
  infoIndex = 0;
  calendarEvents = [];

  constructor(private eventsService:CalendarEventsService, 
              private petInfoService:PetInfoService, 
              private loginService: LoginService, 
              private router: Router) {
  }

  ngOnInit() {
    this.loginService.checkRoute(this.router.url);
    
    this.petInfoService.finishPetLoad.subscribe(data => {
      if (data == true) {
        this.petInfoList = this.petInfoService.petInfo[0].pets;
      }
    });

    this.eventsService.isFinished.subscribe(data => {
      if (data) {
        this.dateEventList = [];
        this.taskEventList = [];
        this.dateEventList = this.eventsService.events[0].date;
        this.taskEventList = this.eventsService.events[0].task;

        this.calendarEvents = [];
        this.calendarEvents = this.eventsService.events;

        this.numOfDaysInMonth();
      }
    });
    this.date = new Date();

    this.eventsService.getEvents();
  }

  numOfDaysInMonth() {
    this.eventDataCollection[0].day = [];
    this.eventDataCollection[0].task = [];
    this.eventDataCollection[0].formattedDate = [];

    this.dow = this.firstOfMonth.getDay();
    this.numEachMonth = [];
    this.adjustDayPosition(this.dow);
    this.numOfDays = new Date(this.currentYear, this.monthNum + 1, 0).getDate();

    for (let i = 1; i <= this.numOfDays; i++) {
      let dateFormatted = new Date(this.currentYear.toString() + '-' + (this.monthNum + 1).toString() + '-' + i.toString());
      dateFormatted = this.eventsService.formatDate(dateFormatted);
      this.eventDataCollection[0].formattedDate.push(dateFormatted);
      this.numEachMonth.push(i);
      this.eventDataCollection[0].day.push(i);
      this.eventDataCollection[0].task.push('');
    }
    this.insertEvents();
  }

  addMonth() {
    this.monthNum++;
    if (this.monthNum >= 12) {
      this.monthNum = 0;
      this.currentYear++;
      this.addYearTracker++;
    }

    this.firstOfMonth = new Date(this.currentYear, this.monthNum, 1);
    this.dow = this.firstOfMonth.getDay();
    this.numOfDaysInMonth();
  }

  subtractMonth() {
    this.monthNum--;
    if (this.monthNum < 0) {
      this.monthNum = 11;
      this.currentYear--;
      this.addYearTracker--;
    }

    this.firstOfMonth = new Date(this.currentYear, this.monthNum, 1);
    this.dow = this.firstOfMonth.getDay();
    this.numOfDaysInMonth();
  }

  adjustDayPosition(day:number) {
    if (day == 1) {
      this.numEachMonth.push('');
    } else if (day == 2) {
      for (let i = 0; i < 2; i++) {
        this.numEachMonth.push('');
      }
    } else if (day == 3) {
      for (let i = 0; i < 3; i++) {
        this.numEachMonth.push('');
      }
    }
    else if (day == 4) {
      for (let i = 0; i < 4; i++) {
        this.numEachMonth.push('');
      }
    }
    else if (day == 5) {
      for (let i = 0; i < 5; i++) {
        this.numEachMonth.push('');
      }
    }
    else if (day == 6) {
      for (let i = 0; i < 6; i++) {
        this.numEachMonth.push('');
      }
    }
  }

  updateMyDate(newDate) {
    this.date = newDate;
    this.monthNum = this.date.getMonth();
    this.today = this.date.getDate();
    this.currentYear = this.date.getFullYear();
    this.firstOfMonth = new Date(this.currentYear, this.monthNum, 1);
    this.dow = this.firstOfMonth.getDay();
    this.numOfDaysInMonth();
  }

  insertEvents() {
    for (let i = 0; i <= this.eventDataCollection[0].task.length; i++) {
      let dateFormatted = new Date(this.currentYear.toString() + '-' + (this.monthNum + 1).toString() + '-' + i.toString());
      dateFormatted = this.eventsService.formatDate(dateFormatted);
      this.dateEventList.map(data => {
        if (dateFormatted == data) {
          this.eventDataCollection[0].task[i] = this.taskEventList[this.dateEventList.indexOf(data)];
        }
      });
    }
  }

  choosePet(index:number) {
    // this.tmpPicHolder[index] = this.petInfoList[index].pic;
    if (!this.petName.includes(this.petInfoList[index].name)) {
      this.petName.push(this.petInfoList[index].name);
    } else {
      this.petName.splice(this.petName.indexOf(this.petInfoList[index].name), 1);
    }

    if (this.petInfoList[index].pic != './assets/images/checked.png') {
      this.tmpPicHolder[index] = this.petInfoList[index].pic;
      this.petInfoList[index].pic = './assets/images/checked.png';
    } else {
      this.petInfoList[index].pic = this.tmpPicHolder[index];
    }

  }

  mouseEnter(index:any) {
    this.mouseOver = true;
    this.boxIndex = index;
  }

  mouseExit(index:any) {
    this.mouseOver = false;
    this.boxIndex = -1;
  }

  createPetList() {
    this.petInfoService.getPets();
  }

  addNewEvent() {
    let newEventDate = moment(this.currentYear.toString() + '-' + (this.monthNum + 1).toString() + '-' + this.boxIndex.toString(), 'YYYY-MM-DD').format('YYYY-MM-DD');

    this.closeModal();

    if (this.newEvent != "") {
      this.eventsService.isFinished.next(false);
      this.eventsService.tmpHoldValue[0].time.push(this.timeOfEvent);
      this.eventsService.tmpHoldValue[0].pet.push(this.petName);
      this.eventsService.tmpHoldValue[0].date.push(newEventDate);
      this.eventsService.tmpHoldValue[0].task.push([this.newEvent]);
      this.eventsService.getEvents();
      this.numOfDaysInMonth();
      this.newEvent = "";
      this.timeOfEvent = "";
      this.petName = [];
      this.petInfoList = [];
      this.tmpPicHolder = [];
    }
  }

  openViewEvent() {
    this.createPetList();
    this.eventViewOpen = true;
    this.petsInvolved = [];
    console.log(this.eventDataCollection[0].task[this.boxIndex]);
    console.log(this.eventDataCollection[0].formattedDate[this.boxIndex -1]);

    this.calendarEvents.map(data => {
      this.infoIndex = data.date.indexOf(this.eventDataCollection[0].formattedDate[this.boxIndex -1]);
      this.petsInvolved.push(data.pet[this.infoIndex]);
    });

    console.log(this.eventDataCollection[0]);
  }

  closeModal() {
    for (let i = 0; i < this.tmpPicHolder.length; i++) {
      if (this.tmpPicHolder[i] != undefined) {
        this.petInfoList[i].pic = this.tmpPicHolder[i];
      }
    }
  }


}
