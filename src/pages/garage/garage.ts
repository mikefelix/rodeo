import { Component, OnInit } from '@angular/core';

import { GarageService } from "../../providers/GarageService";
import { HouseState } from "../../providers/HouseState";
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-garage',
  templateUrl: 'garage.html'
})
export class GaragePage implements OnInit {
  state: HouseState;
  errorMessage: string;
  openMins: number;

  constructor(private garageService: GarageService, public alertCtrl: AlertController) {
    this.state = new HouseState();
    this.openMins = 5;
  }

  ngOnInit():void {
    this.refreshState();
  }

  refreshState(after = null){
    if (after)
      setTimeout(this.refreshState.bind(this), after * 1000);
    else
      this.garageService.getHouseState(true)
        .then((state: HouseState) => this.state = state)
        .catch(error => this.errorMessage = error);
  }

  openGarage(time) {
    if (!time) time = this.openMins;
    if (time > 30) time = '';
    this.garageService.openGarage(time)
      .then(this.refreshState.bind(this, 3)())
      .catch(error => {
        console.log('catching an error: ' + error);
        this.errorMessage = error
      });
  }

  closeGarage() {
    this.garageService.closeGarage()
      .then(this.refreshState.bind(this, 15)())
      .catch(error => this.errorMessage = error);
  }

  openForText(){
    if (!this.openMins || this.openMins > 30)
      return 'Open indefinitely';
    else if (this.openMins == 1)
      return `Open for 1 minute`;
    else
      return `Open for ${this.openMins} minutes`;
  }

  stateText(){
    if (!this.state || this.state.is_open === undefined) {
      return 'Connecting...';
    }
    else {
      let text = 'The garage is ' + (this.state.is_open ? 'open' : 'closed') + '.';
      if (this.state.next_close_time && this.state.current_time){
        let timeUntilClose = Math.floor((new Date(this.state.next_close_time).getTime() - new Date(this.state.current_time).getTime()) / 1000);
        text += ' Closing in ' + timeUntilClose + ' seconds.';
      }

      return text;
    }
  }

  isOpen(){
    return this.state && this.state.is_open;
  }


  info(){
    this.garageService.getHouseState()
      .then( (state: HouseState) => {
        let times = `Last opened: ${this.formatTime(state.last_open_time)}<br/>Last closed: ${this.formatTime(state.last_close_time)}`;
        if (state.next_close_time)
          times += `<br/>Last opened: ${this.formatTime(state.next_close_time)}<br/>`;

        let alert = this.alertCtrl.create({
          title: 'Garage',
          subTitle: times,
          buttons: ['OK']
        });

        alert.present();
      });
  }

  formatTime(time){
    var date = ('' + new Date(time)).replace(/ ?GMT-.... \(...\) ?/,'am')
      .replace(/(\w{3} \w{3} \d{2}) \d{4}/, '$1,')
      .replace(/13:(..:..)am/, "1:$1pm")
      .replace(/14:(..:..)am/, "2:$1pm")
      .replace(/15:(..:..)am/, "3:$1pm")
      .replace(/16:(..:..)am/, "4:$1pm")
      .replace(/17:(..:..)am/, "5:$1pm")
      .replace(/18:(..:..)am/, "6:$1pm")
      .replace(/19:(..:..)am/, "7:$1pm")
      .replace(/20:(..:..)am/, "8:$1pm")
      .replace(/21:(..:..)am/, "9:$1pm")
      .replace(/22:(..:..)am/, "10:$1pm")
      .replace(/23:(..:..)am/, "11:$1pm")
      .replace(/00:(..:..)am/, "12:$1am");
    return date;
  }
}
