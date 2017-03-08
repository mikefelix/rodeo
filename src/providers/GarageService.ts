import {Injectable, OnInit} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {HouseState} from "./HouseState";
import "rxjs/Rx";
import "rxjs/add/operator/toPromise";

@Injectable()
export class GarageService implements OnInit {
  data: Promise<HouseState>;

  private stateUrl = 'http://mozzarelly.com/garage/state';
  private openUrl = 'http://mozzarelly.com/garage/open?auth=auth';
  private closeUrl = 'http://mozzarelly.com/garage/close?auth=auth';
  private lightToggleUrl = 'http://mozzarelly.com/garage/light_BULB?auth=auth';

  constructor(private http: Http) {
  }

  ngOnInit(){
  }

  getHouseState(refresh = false) {
    if (refresh || !this.data){
      this.data = this.http.get(this.stateUrl)
        .map(r => r.json() as HouseState)
        .toPromise()
    }

    return this.data;
  }

  openGarage(time) {
    this.data = null;
    return this.http.post(this.openUrl + time, '', new Headers({}))
      .toPromise()
  }

  closeGarage() {
    this.data = null;
    return this.http.post(this.closeUrl, '', new Headers({}))
      .toPromise()
  }

  toggleLight(bulb) {
    return this.http.post(this.lightToggleUrl.replace('BULB', bulb), '', new Headers({}))
    .toPromise()
  }
}
