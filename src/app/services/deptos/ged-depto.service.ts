import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions,RequestMethod } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { AppCommomService } from '../../services/app-commom.service';

import {GedDepartamento} from '../../Models/ged-departamento';

@Injectable()
export class GedDeptoService {
  urlApi : String;

  constructor(private http: Http,
              private commomService : AppCommomService) {
                this.urlApi = this.commomService.getUrlApi();
              }

  retornardepartamentos(){
    let authToken = window.localStorage.getItem('token');    
    let headers = new Headers({ 'Authorization': 'Bearer ' + authToken });
    
    headers.append('Content-Type', 'Authorization');
    
    let options = new RequestOptions({ headers: headers });


    return  this.http.get(this.urlApi+'/depto_owners',options)
    .map(res => res.json());
  }

  salvarDepartamento(depto: GedDepartamento){
    let body =  {
        name: depto.name,
        criacao: depto.criacao,
        owner:  depto.ownerId,
        descricao:depto.descricao
    };

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Authorization","Bearer "+ window.localStorage.getItem("token"));

    let options = new RequestOptions(
    {
       headers: headers
    });

    return this.http.post(this.urlApi + '/depto/',JSON.stringify(body),options)
    .map(res => res.json());
  }

  updateDepto(depto: any){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Authorization","Bearer "+ window.localStorage.getItem("token"));

    let body = JSON.stringify({
      "name": depto.name,
      "descricao" :depto.descricao
    });

    let options = new RequestOptions(
      {
        headers: headers
      });

    let url = this.urlApi + '/depto/'+depto._id;

    return this.http.put(url,body,options).map(res => res.json());
 }

  deletarDepartamento(depto:any){     
    let headers = new Headers({ 'Content-Type': 'application/json;' });
    headers.append("Authorization","Bearer "+ window.localStorage.getItem("token"));
    let options = new RequestOptions(
      { 
        headers: headers,
        method: RequestMethod.Delete
      }); 
    
    let url = this.urlApi+  '/depto/'+depto._id;
    return this.http.delete(url,options).map(res => res.json());   
  }
}
