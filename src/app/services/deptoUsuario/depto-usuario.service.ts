import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Rx';

import { AppCommomService } from '../../services/app-commom.service';

import { UsuarioDepartamento } from '../../Models/usuario-departamento';

@Injectable()
export class DeptoUsuarioService {

  urlApi : String;

  constructor(private http: Http,
  			  private commomService : AppCommomService
  			  ) { 
  	this.urlApi = this.commomService.getUrlApi();
  }

  public retornarDepartamentoUsuarios(){
  	return this.http.get(this.urlApi+"/depto_users").map(response => response.json());
  }

  salvarDepartamento(ud: UsuarioDepartamento){
    let body =  {
        userList: ud.user,
        depto: ud.depto        
    };

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Authorization","Bearer "+ window.localStorage.getItem("token"));

    let options = new RequestOptions(
    {
       headers: headers
    });

    return this.http.post(this.urlApi + '/depto_users/',JSON.stringify(body),options)
    .map(res => res.json());
  }

  salvarDepartamentoLista(udl: any){
    let body =  {
        userList: udl
    };

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Authorization","Bearer "+ window.localStorage.getItem("token"));

    let options = new RequestOptions(
    {
       headers: headers
    });

    return this.http.post(this.urlApi + '/depto_users_list/',JSON.stringify(body),options)
    .map(res => res.json());
  }

}
