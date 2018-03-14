import { Component, OnInit } from '@angular/core';

import {GarageService} from "../../providers/GarageService";
import {HouseState} from "../../providers/HouseState";

@Component({
  selector: 'page-lights',
  templateUrl: 'lights.html'
})
export class LightsPage implements OnInit {
  state: HouseState;
  errorMessage: string;

  onIcon = 'radio-button-on';
  offIcon = 'radio-button-off';
  bulbsOn = 0;

  bulbs = ['outside', 'garage', 'breezeway', 'driveway', 'aquarium', 'coffee', 'lamp', 'fan'];
  icons = {};

  constructor(private garageService: GarageService) {
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
          for (let bulb of ['outside', 'garage', 'breezeway', 'driveway', 'aquarium', 'lamp', 'ouside', 'coffee', 'fan']) {
            this.icons[bulb] = state.bulbs[bulb] ? this.onIcon : this.offIcon;
            if (this.state.bulbs[bulb]) count++;
          }
          this.bulbsOn = count;
        }
        ).catch(error => this.errorMessage = error);
  }

  toggleLight(bulb){
    this.icons[bulb] = 'refresh';
    this.garageService.toggleLight(bulb).then(this.refreshState.bind(this, 1));
  }

}
