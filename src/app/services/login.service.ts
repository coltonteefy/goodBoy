import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class LoginService {

  store: BehaviorSubject<boolean> =  new BehaviorSubject(false);
  changes = this.store.asObservable();

  constructor() { }

  toggleLoginSuccess(data: boolean) {
    data = !data;
    this.store.next(data);
  }

  checkRoute(route: string) {
    if(route != '/login') {
      this.store.next(true);
    } else {
      this.store.next(false);
    }
  }
}
