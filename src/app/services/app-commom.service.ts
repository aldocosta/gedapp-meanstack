import { Injectable } from '@angular/core';

@Injectable()
export class AppCommomService {

  constructor() { }

  getUrlApi():String{
    return "http://localhost:3000";
  }

}
