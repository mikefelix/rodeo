import {Injectable, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {HouseState} from "./HouseState";
import "rxjs/Rx";
import "rxjs/add/operator/toPromise";

@Injectable()
export class GarageService implements OnInit {
  data: Promise<HouseState>;

  private stateUrl = 'https://mozzarelly.com/home/state';
  private openUrl = 'https://mozzarelly.com/home/openTIME?auth=Gd9kkwtTv7BW2p0Fg';
  private closeUrl = 'https://mozzarelly.com/home/close?auth=Gd9kkwtTv7BW2p0Fg';
  private lightToggleUrl = 'https://mozzarelly.com/home/light/BULB?auth=Gd9kkwtTv7BW2p0Fg';

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
    return this.http.post(this.openUrl.replace('TIME', time), '')
      .toPromise()
  }

  closeGarage() {
    this.data = null;
    return this.http.post(this.closeUrl, '')
      .toPromise()
  }

  toggleLight(bulb) {
    return this.http.post(this.lightToggleUrl.replace('BULB', bulb), '')
    .toPromise()
  }
}
