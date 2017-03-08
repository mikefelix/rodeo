import {Injectable, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {Forecast} from "./Forecast";
import {Current} from "./Current";
import {History} from "./History";
import "rxjs/Rx";
import "rxjs/add/operator/toPromise";

@Injectable()
export class WeatherService implements OnInit {
  current: Promise<Current>;
  forecast1: Promise<Forecast>;
  forecast2: Promise<Forecast>;
  history: Promise<History>;

  private currentUrl = 'http://mozzarelly.com/weather/current';
  private forecast1Url = 'http://mozzarelly.com/weather/forecast1';
  private forecast2Url = 'http://mozzarelly.com/weather/forecast2';
  private historyUrl = 'http://mozzarelly.com/weather/historical';

  constructor(private http: Http) {
  }

  ngOnInit(){
  }

  getCurrent(refresh = false) {
    if (refresh || !this.current){
      this.current = this.http.get(this.currentUrl)
        .map(r => r.json() as Current)
        .toPromise()
    }

    return this.current;
  }

  getForecast1(refresh = false) {
    if (refresh || !this.forecast1){
      this.forecast1 = this.http.get(this.forecast1Url)
        .map(r => r.json() as Forecast)
        .toPromise()
    }

    return this.forecast1;
  }

  getForecast2(refresh = false) {
    if (refresh || !this.forecast2){
      this.forecast2 = this.http.get(this.forecast2Url)
        .map(r => r.json() as Forecast)
        .toPromise()
    }

    return this.forecast2;
  }

  getHistory(refresh = false){
    if (refresh || !this.history){
      this.history = this.http.get(this.historyUrl)
        .map(r => r.json() as History)
        .map((hist: History) => {
          console.log("low " + hist.low);
          hist.low = Math.round(hist.low);
          hist.high = Math.round(hist.high);
          return hist;
        })
        .toPromise()
    }

    return this.history;
  }
}
