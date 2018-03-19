import { Component, OnInit } from '@angular/core';

import {Current} from "../../providers/Current";
import {Forecast} from "../../providers/Forecast";
import {History} from "../../providers/History";
import {WeatherService} from "../../providers/WeatherService";

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage implements OnInit {
  selectedSegment: string = 'current';
  errorMessage: string;

  time: { ampm: string, hour: string, minutes: string };

  current: Current = <Current>{
    cond: "blank",
    temp: 0,
    hum: 0,
    night: false,
    recordedAt: ''
  };

  forecast1: Forecast = <Forecast>{
    title: '',
    temp: 0,
    hum: 0,
    cond: 'blank',
    cast: '',
    night: false,
    recordedAt: ''
  };

  forecast2: Forecast = this.forecast1;

  history: History = <History>{
    low: 0,
    maxLow: 0,
    minLow: 0,
    maxHigh: 0,
    minHigh: 0,
    high: 0,
    precip: 0,
    recordedAt: ''
  };

  constructor(public weatherService: WeatherService) {
    let date = new Date();

    this.time = {
      ampm: (date.getHours() >= 12 ? 'pm' : 'am'),
      hour: (date.getHours() > 12 ? date.getHours() - 12 : (date.getHours() == 0 ? '12' : date.getHours())).toString(),
      minutes: date.getMinutes().toString().replace(/^(.)$/, '0$1')
    }
  }

  image(cond: string){
    return `https://mozzarelly.com/weathericons/${cond}.png`;
  }

  dir(forecast: Forecast){
    return forecast.night ? "↓" : "↑";
  }

  ngOnInit() {
    this.refreshState();
  }

  refreshState(){
    this.weatherService.getCurrent(true)
      .then((curr: Current) => this.current = curr)
      .catch(error => this.errorMessage = error);

    this.weatherService.getForecast1(true)
      .then((f: Forecast) => this.forecast1 = f)
      .catch(error => this.errorMessage = error);

    this.weatherService.getForecast2(true)
      .then((f: Forecast) => this.forecast2 = f)
      .catch(error => this.errorMessage = error);

    this.weatherService.getHistory(true)
      .then((h: History) => this.history = h)
      .catch(error => this.errorMessage = error);
  }

}
