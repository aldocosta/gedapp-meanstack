import { Injectable ,OnInit} from '@angular/core';
import { Http,Headers,RequestOptions,RequestMethod } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { User } from './../Models/user';
import { AppCommomService } from '../services/app-commom.service';

@Injectable()
export class PostsService implements OnInit {
   urlApi : String;

  constructor(private http: Http,
              private commomService : AppCommomService) { 
                this.urlApi = this.commomService.getUrlApi();    
              }

  ngOnInit() {
    
  }

  // Get all posts from the API
  getAllPosts() {
    return this.http.get(this.urlApi+'/api/posts')
       .map(res => res.json());       
  }

  getAllUsers(){
    
    let authToken = window.localStorage.getItem('token');    
    let headers = new Headers({ 'Authorization': 'Bearer ' + authToken });
    
    headers.append('Content-Type', 'Authorization');
    
    let options = new RequestOptions({ headers: headers });

    var erro = {status:'',statusText:''};
    
    return this.http.get(this.urlApi + '/users',options)
    .map(res => res.json()).    
    catch(err=> {
       erro.status = err.status;
       erro.statusText = err.statusText;
      return Observable.throw(
        new Error(JSON.stringify(erro))          
      );      
    });    
  }

  postUser(user){
    const body  ={
      name:user.name,
      email:user.email,
      password:user.password,
      roles:user.roles
    }
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Authorization","Bearer "+ window.localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlApi + '/users/',JSON.stringify(body),options)
    .map(res => res.json());
  }

  deleteUser(user){
    
   let headers = new Headers({ 'Content-Type': 'application/json;' });
   headers.append("Authorization","Bearer "+ window.localStorage.getItem("token"));
   let options = new RequestOptions(
     { 
       headers: headers,
       method: RequestMethod.Delete
     }); 
   
   let url = this.urlApi+  '/users/'+user._id;

   return this.http.delete(url,options).map(res => res.json());   
  }

  updateUser(user){
     let headers = new Headers({ 'Content-Type': 'application/json' });
     headers.append("Authorization","Bearer "+ window.localStorage.getItem("token"));

     let body = JSON.stringify({
       "name" : user.name,
       "email" : user.email,
       "password":user.password,
       "roles":user.roles
     });

     let options = new RequestOptions(
       {
         headers: headers         
       });     
     
     let url = this.urlApi + '/users/'+user._id;

     return this.http.put(url,body,options).map(res => res.json());   
  }

  retornarHeader() : RequestOptions{
    let authToken = window.localStorage.getItem('token');    
    let headers = new Headers({ 'Authorization': 'Bearer ' + authToken });
    
    headers.append('Content-Type', 'Authorization');
    
    let options = new RequestOptions({ headers: headers });
    return options;
  }
  
}