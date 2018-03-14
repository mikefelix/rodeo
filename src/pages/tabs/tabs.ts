import { Component } from '@angular/core';

import { GaragePage } from '../garage/garage';
import { LightsPage } from '../lights/lights';
import { WeatherPage } from "../weather/weather";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = LightsPage;
  tab2Root: any = GaragePage;
  tab3Root: any = WeatherPage;

  constructor() {

  }
}
