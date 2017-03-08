import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { GarageService } from "../providers/GarageService";

import { TabsPage } from '../pages/tabs/tabs';
import {WeatherService} from "../providers/WeatherService";


@Component({
  templateUrl: 'app.html',
  providers: [GarageService, WeatherService]
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    //noinspection TypeScriptUnresolvedFunction
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
