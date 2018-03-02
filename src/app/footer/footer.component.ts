import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
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
