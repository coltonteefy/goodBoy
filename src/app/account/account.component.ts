import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject} from "rxjs/BehaviorSubject";


// https://community.apigee.com/questions/1651/how-to-get-longitude-and-latitude-of-a-location-us.html
// https://developers.google.com/maps/documentation/geocoding/start
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
// https://maps.googleapis.com/maps/api/geocode/json?address=95101

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  lat:number = 34.056701;
  lng:number = -84.343688;
  zipCode: string;
  isLoaded = new BehaviorSubject<boolean>(false);
  mapData = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.isLoaded.subscribe(data => {
      if(data) {
        console.log("MAP DATA",this.mapData);
        // this.lat = this.mapData[0].geometry.location[0];
      }
    });
  }
  
  search() {
    // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
    let nearBy = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyAuFeR6r_-A9F5Pcvgl5zuB5aIy08BwPEk';
    let API_KEY = 'AIzaSyAuFeR6r_-A9F5Pcvgl5zuB5aIy08BwPEk';

    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    console.log(nearBy);
    let connect = url.concat(this.zipCode);
    this.isLoaded.next(false);

    this.http.get(connect)
      .subscribe((data: {results:any[]}) => {
        console.log(data.results[0].geometry.location);
        this.lat = data.results[0].geometry.location.lat;
        this.lng = data.results[0].geometry.location.lng;
        this.mapData.push(JSON.parse(JSON.stringify(data.results[0])));

        this.isLoaded.next(true);
      });
  }
}
