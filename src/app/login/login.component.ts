import { Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginSuccess = false;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.loginService.checkRoute(this.router.url);
  }

  loginToggle() {
    
    this.loginService.toggleLoginSuccess(this.loginSuccess)
  }
}
