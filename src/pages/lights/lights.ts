import { Component, OnInit } from '@angular/core';

import {GarageService} from "../../providers/GarageService";
import {HouseState} from "../../providers/HouseState";
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-lights',
  templateUrl: 'lights.html'
})
export class LightsPage implements OnInit {
  state: HouseState;
  errorMessage: string;

  onIcon = 'assets/icon/toggle-filled.png';
  offIcon = 'assets/icon/toggle.png';
  bulbsOn = 0;
  states = {};

  bulbs = ['outside', 'garage', 'breezeway', 'driveway', 'aquarium', 'coffee', 'wine', 'lamp', 'fan', 'grow'];
  icons = {};

  constructor(private garageService: GarageService, public alertCtrl: AlertController) {
    this.state = new HouseState();
    this.bulbs.map(bulb => this.icons[bulb] = 'refresh');
  }

  ngOnInit():void {
    this.refreshState();
  }

  isOn(bulb){
    return this.state && this.state.bulbs && this.state.bulbs[bulb] === true;
  }

  isOff(bulb){
    return this.state && this.state.bulbs && this.state.bulbs[bulb] !== true;
  }

  bulbCountText(){
    return this.bulbsOn + (this.bulbsOn == 1 ? ' light is ' : ' lights are ') + 'on.'
  }

  refreshState(after = null){
    if (after)
      setTimeout(this.refreshState.bind(this), after * 1000);
    else
      this.garageService.getHouseState(true)
        .then((state: HouseState) => {
          this.state = state;
          let count = 0;
          for (let bulb of this.bulbs) {
            this.states[bulb] = state.bulbs[bulb];
            this.icons[bulb] = this.states[bulb] ? this.onIcon : this.offIcon;
            if (state.bulbs[bulb]) count++;
          }
          this.bulbsOn = count;
        }
        ).catch(error => this.errorMessage = error);
  }

  cap(name: String){
    return name.substring(0, 1).toUpperCase() + name.substring(1);
  }

  info(bulb: string){
    this.garageService.getHouseState().then((state) => {
      let schedules = state.schedules[bulb] || {};
      let schedText = '';
      for (let s in schedules){
          schedText += `${this.cap(s)} time: ${schedules[s].date} (${schedules[s].spec})<br/>`;
      }

      this.alertCtrl.create({
        title: this.cap(bulb),
        subTitle: `The light is ${state.bulbs[bulb] ? 'on' : 'off'}.<br/>${schedText}`,
        buttons: ['OK']
      }).present();
    });
  }

  toggleLight(bulb){
    //this.icons[bulb] = 'refresh';
    this.garageService.toggleLight(bulb).then(this.refreshState.bind(this, 1));
  }

}
