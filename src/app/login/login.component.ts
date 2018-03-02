import { Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private timer;
  loginSuccess = false;
  indexOfPic = 0;
  gifList = [
    'http://31.media.tumblr.com/1f37c04ccc3d49796e9c8d65dd624365/tumblr_n2036cSXrk1qcj3tho2_500.gif',
    'https://media2.giphy.com/media/Lr5X4oaHuxrvq/giphy.gif',
    'https://media.giphy.com/media/Z5d1K9fmwY65i/giphy.gif',
    'http://img.viralnova.com/000/112/302/funny-animal-003.gif',
    'http://www.awesomelycute.com/gallery/2015/11/funny-animal-gifs-39.gif',
    'https://media.giphy.com/media/ZwtLLmsBgKgEw/giphy.gif'
  ];
  showPic = this.gifList[this.indexOfPic];
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    // this.timer = timer(0, 2000).subscribe(t => {
    //   console.log(this.showPic);
    //   if(this.indexOfPic == this.gifList.length - 1) {
    //     this.indexOfPic = 0;
    //   } else {
    //     this.indexOfPic++;
    //   }
    //   this.showPic = this.gifList[this.indexOfPic];
    //   document.getElementById('right').style.background = 'url(" ' +this.showPic + '") no-repeat center center fixed';
    //   document.getElementById('right').style.backgroundSize = 'cover';
    // });


  }

  loginToggle() {
    console.log("success");
    this.loginService.toggleLoginSuccess(this.loginSuccess)
  }
}
