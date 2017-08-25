import { Injectable, EventEmitter } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MySharedService {
  navchange: EventEmitter<number> = new EventEmitter();

  constructor() { }
  
  emitNavChangeEvent(number) {
    this.navchange.emit(number);
  }
  getNavChangeEmitter() {
    return this.navchange;
  }

}
