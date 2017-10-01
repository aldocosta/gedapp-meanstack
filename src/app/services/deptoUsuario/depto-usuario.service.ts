import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

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

}
