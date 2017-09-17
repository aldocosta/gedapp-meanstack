import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions,RequestMethod } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { AppCommomService } from '../../services/app-commom.service';

import {GedDepartamento} from '../../models/ged-departamento';

@Injectable()
export class GedDeptoService {
  urlApi : String;

  constructor(private http: Http,
              private commomService : AppCommomService) { 
                this.urlApi = this.commomService.getUrlApi();                    
              }

  retornardepartamentos(){    
    return  this.http.get(this.urlApi+'/depto_owners')
    .map(res => res.json());
  }

  editarDepartamento(depto: GedDepartamento){
    let body = JSON.stringify({
      
    });
    // this.g.forEach(element => {
    //   if(element.id==depto.id){
    //     element = depto;
    //   }
    // });
  }

//   updateUser(user){
//     let headers = new Headers({ 'Content-Type': 'application/json' });
//     headers.append("Authorization","Bearer "+ window.localStorage.getItem("token"));

//     let body = JSON.stringify({
//       "name" : user.name,
//       "email" : user.email,
//       "password":user.password,
//       "roles":user.roles
//     });

//     let options = new RequestOptions(
//       {
//         headers: headers         
//       });     
    
//     let url = this.urlApi + '/user/'+user._id;

//     return this.http.put(url,body,options).map(res => res.json());   
//  }




  deletarDepartamento(depto:GedDepartamento):void{
    // let i = this.g.indexOf(depto);
    // this.g.slice(i,1);
  }
}
