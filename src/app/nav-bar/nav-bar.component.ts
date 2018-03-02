import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedIn: boolean;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.store.subscribe(data => {
      this.loggedIn = data;
    })
  }

  ngOnDestroy() {
    this.loginService.store.unsubscribe();
  }

  loginScreen() {
    this.loginService.toggleLoginSuccess(this.loggedIn);
  }
}
