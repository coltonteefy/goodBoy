///<reference path="../../node_modules/@angular/http/src/http_module.d.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgModule} from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import {HttpClientModule} from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmDirectionModule } from 'agm-direction';

import {AppComponent} from './app.component';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {LoginComponent} from "./login/login.component";
import {AppRoutingModule} from './app-routing.module';
import {PetsComponent} from "./pets/pets.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {LoginService} from "./services/login.service";
import {AddPetFormComponent} from "./add-pet-form/add-pet-form.component";
import {FooterComponent} from "./footer/footer.component";
import {CalendarEventsService} from "./services/calendar-events.service";
import {PetInfoService} from "./services/pet-info.service";
import {MapComponent} from "./map/map.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    PetsComponent,
    CalendarComponent,
    AddPetFormComponent,
    FooterComponent,
    MapComponent
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
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAuFeR6r_-A9F5Pcvgl5zuB5aIy08BwPEk',
      libraries: ["places"]
    }),
    AgmDirectionModule
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
