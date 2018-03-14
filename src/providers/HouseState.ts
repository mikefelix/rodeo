export class HouseState {
  /*
  {
      "garage": {
          "is_open": false,
          "keep_open": false,
          "last_open_time": "02/24/2018, 10:42:09am",
          "last_close_time": "02/24/2018, 10:52:11am",
          "next_close_time": null,
          "close_attempts": 0,
          "current_time": "02/24/2018, 3:00:27pm"
      },
      "times": {
          "current": "02/24/2018, 3:00:27pm",
          "isNight": false,
          "sunrise": "02/24/2018, 7:10:27am",
          "sunset": "02/24/2018, 6:11:08pm",
          "dayReset": "02/24/2018, 4:00:00am"
      },
      "bulbs": {
          "lamp": false,
          "aquarium": true,
          "garage": false,
          "breezeway": false,
          "driveway": false,
          "outside": false,
          "wine": false,
          "coffee": true,
          "history": {
              "coffee": {
                  "off": {
                      "date": "02/23/2018, 11:00:15pm",
                      "source": "schedule"
                  },
                  "on": {
                      "date": "02/24/2018, 7:30:38am",
                      "source": "schedule"
                  }
              },
              "wine": {
                  "on": {
                      "date": "02/23/2018, 6:40:03pm",
                      "source": "schedule"
                  },
                  "off": {
                      "date": "02/23/2018, 11:02:15pm",
                      "source": "schedule"
                  }
              },
              "garage": {},
              "breezeway": {},
              "driveway": {
                  "off": {
                      "date": "02/23/2018, 4:49:57pm",
                      "source": "unknown"
                  }
              },
              "outside": {
                  "on": {
                      "date": "02/20/2018, 6:34:26pm",
                      "source": "garage opened at night"
                  },
                  "undo on": {
                      "date": "02/20/2018, 6:37:26pm",
                      "source": "delay"
                  }
              },
              "lamp": {
                  "on": {
                      "date": "02/23/2018, 5:39:59pm",
                      "source": "schedule"
                  },
                  "off": {
                      "date": "02/23/2018, 11:30:15pm",
                      "source": "schedule"
                  },
                  "toggle on": {
                      "date": "02/19/2018, 11:30:57pm",
                      "source": "POST /light/lamp"
                  }
              },
              "aquarium": {
                  "off": {
                      "date": "02/23/2018, 10:00:11pm",
                      "source": "schedule"
                  },
                  "on": {
                      "date": "02/24/2018, 7:10:36am",
                      "source": "schedule"
                  }
              }
          }
      },
      "schedules": {
          "reset": {
              "at": {
                  "spec": "03:59",
                  "date": "02/24/2018, 3:59:00am"
              }
          },
          "coffee": {
              "on": {
                  "spec": "07:30",
                  "date": "02/24/2018, 7:30:00am"
              },
              "off": {
                  "spec": "23:00",
                  "date": "02/24/2018, 11:00:00pm"
              }
          },
          "wine": {
              "on": {
                  "spec": "sunset+30",
                  "date": "02/24/2018, 6:41:08pm"
              },
              "off": {
                  "spec": "23:02",
                  "date": "02/24/2018, 11:02:00pm"
              }
          },
          "outside": {
              "off": {
                  "spec": "sunrise",
                  "date": "02/24/2018, 7:10:27am"
              }
          },
          "lamp": {
              "on": {
                  "spec": "sunset-30",
                  "date": "02/24/2018, 5:41:08pm"
              },
              "off": {
                  "spec": "23:30",
                  "date": "02/24/2018, 11:30:00pm"
              }
          },
          "aquarium": {
              "on": {
                  "spec": "sunrise",
                  "date": "02/24/2018, 7:10:27am"
              },
              "off": {
                  "spec": "22:00",
                  "date": "02/24/2018, 10:00:00pm"
              }
          }
      }
  }
  */
  garage: {
    is_open: boolean,
    keep_open: boolean,
    last_open_time: string,
    last_close_time: string,
    next_close_time: string,
    close_attempts: number,
    current_time: string,
    is_night: boolean
  };

  bulbs: {
    breezeway: boolean,
    garage: boolean,
    lamp: boolean,
    aquarium: boolean,
    driveway: boolean,
    outside: boolean,
    coffee: boolean,
    fan: boolean
  };

  times: {
    current: string,
    isNight: false,
    sunrise: string,
    sunset: string,
    dayReset: string
  };

  constructor(){
    this.garage = {
        is_open: false,
        keep_open: false,
        last_open_time: '',
        last_close_time: '',
        next_close_time: '',
        close_attempts: 0,
        current_time: '',
        is_night: false
    };

    this.bulbs = {
        breezeway: false,
        garage: false,
        lamp: false,
        aquarium: false,
        driveway: false,
        outside: false,
        coffee: false,
        fan: false
    };

    this.times = {
        current: '',
        isNight: false,
        sunrise: '',
        sunset: '',
        dayReset: ''
    };
  }

}
