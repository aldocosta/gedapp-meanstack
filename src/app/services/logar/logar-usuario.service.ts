import { Injectable, EventEmitter } from '@angular/core';
import { Http,Headers,RequestOptions,RequestMethod } from '@angular/http';
import { Router } from '@angular/router';

import { User } from '../../Models/user';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LogarUsuarioService {  
  user:User;  
  constructor(
            private http:Http,
            private router:Router) { }

  /**
   * Realiza logon na base de dados
   * @param user Objeto usuario com login e senha
   * 
   */
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
      return res.json();
    });
  }

  logoff(){
    window.localStorage.removeItem('token');        
    window.localStorage.removeItem('usuario');        
    this.router.navigate(['/']);    
  }

  pegarUsuarioLogadoViaLocalStorage(){
    let usuario = JSON.parse(window.localStorage.getItem('usuario'));
    return usuario;
  }
}
