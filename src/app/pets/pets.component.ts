import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {trigger, state, style, animate, transition} from '@angular/animations';
import {PetInfoService} from "../services/pet-info.service";
import {CalendarEventsService} from "../services/calendar-events.service";


@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1, height: '100%'
      })),
      state('hide', style({
        opacity: 0, height: 0
      })),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('300ms ease-in'))
    ]),

    trigger('editShow', [
      state('editOn', style({
        opacity: 1, height: 10
      })),
      state('editOff', style({
        opacity: 0, height: 0
      })),
      transition('editOn => editOff', animate('200ms ease-out')),
      transition('editOff => editOn', animate('200ms ease-in'))
    ]),
  ]
})

export class PetsComponent implements OnInit {
  addPetFormOpen = false;
  hidePetForm = 'hide';
  editShowHide = 'editOff';
  editModeOn = false;
  petInfoList = [];
  petIndex = 0;
  medication = "";
  calendarLoaded = false;
  calendarEvents = [];
  overviewEventDates = [];
  overviewEventTasks = [];
  overViewEventTime = [];
  listLoaded = false;

  currentUser = "joe";

  userInfo = [];

  constructor(private loginService:LoginService,
              private petInfoService:PetInfoService,
              private calendarEventService:CalendarEventsService) {
  }

  ngOnInit() {
    this.calendarEventService.isFinished.subscribe(data => {
      if (data == true) {
        this.calendarEvents = [];
        this.calendarLoaded = data;
        this.calendarEvents = this.calendarEventService.events;
        this.listLoaded = true;
      }
    });

    this.loginService.store.subscribe(data => {
      if (!data) {
        this.loginService.toggleLoginSuccess(data);
      }
    });

    this.petInfoService.finishPetLoad.subscribe(data => {
      if (data == true) {
        this.petInfoList = this.petInfoService.petInfo[0].pets;

        this.petInfoService.userInfo.map(res => {
          console.log("HELLO" + res);
        })
      }
    });

    this.petInfoService.getPets();
    this.petInfoService.getUserPets();
    this.calendarEventService.getEvents();
  }

  togglePetForm() {
    this.addPetFormOpen = !this.addPetFormOpen;
    if (!this.addPetFormOpen) {
      this.hidePetForm = 'hide';
    } else {
      this.hidePetForm = 'show';
    }
  }

  removePet(num:any) {
    this.petInfoList.map(data => {
      if (num.name == data.name && num.age == data.age) {
        console.log(this.petInfoList[this.petInfoList.indexOf(num)]);
        this.petInfoList.splice(this.petInfoList.indexOf(num), 1);
      }
    })
  }

  deleteProfileView(name:string, age:any) {
    this.petInfoList.map(data => {
      if (name == data.name && age == data.age) {
        this.petInfoList.splice(this.petInfoList.indexOf(data), 1);
      }
    })
  }

  toggleEditMode() {
    this.editModeOn = !this.editModeOn;
    this.editShowHide = (this.editModeOn) ? 'editOn' : 'editOff';
  }

  overviewClick(index:number) {
    console.log(this.petInfoList[index].name, "NAMES IN MODAL");
    let sortIndex = [];
    let tmpEventHolder = [];
    let tmpTimeHolder = [];
    this.overviewEventDates = [];
    this.overviewEventTasks = [];
    this.overViewEventTime = [];
    this.petIndex = index;
    if (this.petInfoList[index].medication == "") {
      this.medication = 'N/A';
    } else {
      this.medication = this.petInfoList[index].medication;
    }

    this.calendarEvents.map(data => {
      for (let i = 0; i < data.task.length; i++) {
        if (data.pet[i].includes(this.petInfoList[index].name) || data.pet[i] == "All") {
          this.overviewEventDates.push(data.date[i].toString());
          sortIndex.push(data.date[i].toString());
          this.overviewEventTasks.push(data.task[i].toString());
          this.overViewEventTime.push(data.time[i].toString())
        }
      }
      this.overviewEventDates.sort();
      for (let i = 0; i < sortIndex.length; i++) {
        tmpEventHolder[this.overviewEventDates.indexOf(sortIndex[i])] = this.overviewEventTasks[i];
        tmpTimeHolder[this.overviewEventDates.indexOf(sortIndex[i])] = this.overViewEventTime[i];
      }
      this.overviewEventTasks = tmpEventHolder;
      this.overViewEventTime = tmpTimeHolder;
    })
  }
}
