import { Injectable, EventEmitter } from '@angular/core';
import { Http,Headers,RequestOptions,RequestMethod } from '@angular/http';

import { User } from '../../Models/user';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LogarUsuarioService {
  onGetData: EventEmitter<string> = new EventEmitter();
  user:User;  
  constructor(private http:Http) { }

  logar(user:any){
    this.user = user;

    const body  = {      
      email:user.email,
      password:user.password      
    }
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/logar',JSON.stringify(body),options)
    .map(res => {
      this.onGetData.emit(res.json());
      return res.json();
    });
  }
}
