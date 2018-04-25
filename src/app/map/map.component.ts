import {Component, OnInit, NgZone, ViewChild, ElementRef} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {FormControl} from "@angular/forms";
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';

// https://angular-maps.com/api-docs/agm-core/components/AgmMap.html
// https://www.npmjs.com/package/agm-direction

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  searchControl:FormControl;
  lat:number;
  lng:number;
  miles:any;
  zoom = 15;
  address = "";
  phoneNumber = "";
  todayHours = "";
  open = "";
  website = "";
  name = "";
  directionLatitudeList = [];
  directionLongitudeList = [];
  hours:any;
  dir:any;
  applyDirections = false;

  @ViewChild("search")
  public searchElementRef:ElementRef;

  @ViewChild("origin")
  public originElementRef:ElementRef;

  @ViewChild("destination")
  public destinationElementRef:ElementRef;

  constructor(private mapsAPILoader:MapsAPILoader, private ngZone:NgZone) {
  }

  ngOnInit() {
    this.searchControl = new FormControl();
    this.getUserLocation();
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.directionLatitudeList.push(this.lat);
        this.directionLongitudeList.push(this.lng);
      });
    }
  }

  calculateDistance(lat1:number, lat2:number, lng1:number, lng2:number) {
    let radLat1 = Math.PI * lat1 / 180;
    let radLat2 = Math.PI * lat2 / 180;
    let theta = lng2 - lng1;
    let radTheta = Math.PI * theta / 180;
    let dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }

  public getDirection() {
    document.getElementById('myPanel').style.display = 'initial';
    this.applyDirections = true;
    if (this.directionLatitudeList.length > 1) {
      this.dir = {
        origin: {lat: this.directionLatitudeList[0], lng: this.directionLongitudeList[0]},
        destination: {lat: this.directionLatitudeList[1], lng: this.directionLongitudeList[1]}
      }
    }
  }

  searchChanges() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          if (this.directionLatitudeList.length != 1) {
            for (let i = 1; i < this.directionLatitudeList.length; i++) {
              this.directionLatitudeList.pop();
              this.directionLongitudeList.pop();
            }
          }
          this.address = "";
          this.phoneNumber = "";
          this.todayHours = "";
          this.open = "";
          this.website = "";
          this.name = "";
          this.miles = 0;
          this.dir = {};
          let date = new Date().getDay();

          //get the place result

          let place:google.maps.places.PlaceResult = autocomplete.getPlace();

          if (!place.types.includes('street_address')) {
            this.address = place.formatted_address;

            if (place.formatted_phone_number !== void 0) {
              this.phoneNumber = place.formatted_phone_number;
            }

            this.website = place.website;
            this.name = place.name;

            if (place.opening_hours !== void 0) {
              this.hours = place.opening_hours.weekday_text;
              if (date == 0) {
                this.todayHours = this.hours[6];
              } else {
                this.todayHours = this.hours[date - 1];
              }
            }

            if (place.opening_hours !== void 0 && place.opening_hours.open_now) {
              this.open = " open";
            } else {
              this.open = " closed";
            }
          } else {
            this.address = place.formatted_address;
          }

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.directionLatitudeList.push(this.lat);
          this.directionLongitudeList.push(this.lng);
          this.miles = this.calculateDistance(this.directionLatitudeList[0], this.directionLatitudeList[1], this.directionLongitudeList[0], this.directionLongitudeList[1]).toFixed(1);
          this.zoom = 16;
        });
      });
    });
  }


  originChanges() {
    this.dir = {};
    console.log("ORIGIN CHANGES");
    this.directionLatitudeList[0] = "";
    this.directionLongitudeList[0] = "";
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.originElementRef.nativeElement, {});
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place:google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.directionLatitudeList[0] = this.lat;
          this.directionLongitudeList[0] = this.lng;
          this.dir = {
            origin: {lat: this.directionLatitudeList[0], lng: this.directionLongitudeList[0]},
            destination: {lat: this.directionLatitudeList[1], lng: this.directionLongitudeList[1]}
          };
          this.getDirection();
        });
      });
    });
  }

  destinationChanges() {
    this.dir = {};
    console.log("DESTINATION CHANGES");
    this.directionLatitudeList[1] = "";
    this.directionLongitudeList[1] = "";
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.destinationElementRef.nativeElement, {});
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place:google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.directionLatitudeList[1] = this.lat;
          this.directionLongitudeList[1] = this.lng;
          this.dir = {
            origin: {lat: this.directionLatitudeList[0], lng: this.directionLongitudeList[0]},
            destination: {lat: this.directionLatitudeList[1], lng: this.directionLongitudeList[1]}
          };
          this.getDirection();
        });
      });
    });
  }

  toggleDirectionPanel() {
    if( this.applyDirections) {
      this.directionLatitudeList = [];
      this.directionLongitudeList = [];
      this.dir = {
        origin: {},
        destination: {}
      };
      this.applyDirections = !this.applyDirections;
      document.getElementById('myPanel').style.display = 'none';
      console.log(this.applyDirections, this.dir);
    }
  }
}
