import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {PetsComponent} from "./pets/pets.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {AccountComponent} from "./account/account.component";
import {MapComponent} from "./map/map.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'map', component: MapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
