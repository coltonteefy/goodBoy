///<reference path="../../node_modules/@angular/http/src/http_module.d.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AgmCoreModule} from '@agm/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {LoginComponent} from "./login/login.component";
import {AppRoutingModule} from './app-routing.module';
import {PetsComponent} from "./pets/pets.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {AccountComponent} from "./account/account.component";
import {LoginService} from "./services/login.service";
import {AddPetFormComponent} from "./add-pet-form/add-pet-form.component";
import {FooterComponent} from "./footer/footer.component";
import {CalendarEventsService} from "./services/calendar-events.service";
import {PetInfoService} from "./services/pet-info.service";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    PetsComponent,
    CalendarComponent,
    AccountComponent,
    AddPetFormComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAuFeR6r_-A9F5Pcvgl5zuB5aIy08BwPEk'
    })
  ],
  providers: [
    LoginService,
    MatDatepickerModule,
    CalendarEventsService,
    PetInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
