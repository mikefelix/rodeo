export class HouseState {
//{"is_open":false,"keep_open":false,"last_open_time":"2017-02-28T17:25:31.701Z","last_close_time":"2017-02-28T17:25:50.088Z",
// "next_close_time":null,"close_attempts":0,"current_time":"2017-02-28T19:06:28.617Z","is_night":false,"bulbs":{"garage":false,"breezeway":false,"lamp":false,"aquarium":true}}
  is_open: boolean;
  keep_open: boolean;
  last_open_time: string;
  last_close_time: string;
  next_close_time: string;
  close_attempts: number;
  current_time: string;
  is_night: boolean;
  test: string;
  bulbs: {
    breezeway: boolean,
    garage: boolean,
    lamp: boolean,
    aquarium: boolean,
  };

  constructor(){
    this.test = 'Yes.';
  }


}
