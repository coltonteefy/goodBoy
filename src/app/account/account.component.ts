import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject} from "rxjs/BehaviorSubject";
// declare const google:any;

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
    })
    // https://community.apigee.com/questions/1651/how-to-get-longitude-and-latitude-of-a-location-us.html
    // https://developers.google.com/maps/documentation/geocoding/start
    // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
    // https://maps.googleapis.com/maps/api/geocode/json?address=95101


    // this.getLocation();
    // console.log(this.latitude, this.longitude);
    // let mapProp = {
    //   center: new google.maps.LatLng(51.508742, -0.120850),
    //   zoom: 5,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // let map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  }

  // getLocation() {
  //   if(navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(this.showPosition);
  //   }
  // }
  //
  // showPosition(position) {
  //   let lat = position.coords.latitude;
  //   let long = position.coords.longitude;
  // }

  // initMap() {
  //   // Create a map object and specify the DOM element for display.
  //   let map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: -34.397, lng: 150.644},
  //     zoom: 8
  //   });
  // }

  // initMap() {
  //   // Create the map with no initial style specified.
  //   // It therefore has default styling.
  //   this.map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: -33.86, lng: 151.209},
  //     zoom: 13,
  //     mapTypeControl: false
  //   });
  //
  //   // Add a style-selector control to the map.
  //   var styleControl = document.getElementById('style-selector-control');
  //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);
  //
  //   // Set the map's style to the initial value of the selector.
  //   var styleSelector = document.getElementById('style-selector');
  //   map.setOptions({styles: styles[styleSelector.value]});
  //
  //   // Apply new JSON when the user selects a different style.
  //   styleSelector.addEventListener('change', function() {
  //     map.setOptions({styles: styles[styleSelector.value]});
  //   });
  // }

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
