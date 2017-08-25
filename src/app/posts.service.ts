import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions,RequestMethod } from '@angular/http';
import { User } from '././Models/user';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PostsService {

  constructor(private http: Http) { }

  // Get all posts from the API
  getAllPosts() {
    return this.http.get('http://localhost:3000/api/posts')
    //return this.http.get(this.config.getpostapiUrl()+ 'posts')
       .map(res => res.json());       
  }

  getAllUsers(){
    
    let authToken = window.localStorage.getItem('token');    
    let headers = new Headers({ 'Authorization': 'Bearer ' + authToken });
    
    headers.append('Content-Type', 'Authorization');
    
    let options = new RequestOptions({ headers: headers });

    var erro = {status:'',statusText:''};
    return this.http.get('http://localhost:3000/user',options)
    .map(res => res.json()).    
    catch(err=> {
       erro.status = err.status;
       erro.statusText = err.statusText;
      return Observable.throw(
        new Error(JSON.stringify(erro))          
      );
      //return err.json
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


    return this.http.post('http://localhost:3000/user/',JSON.stringify(body),options)
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
   
   let url ='http://localhost:3000/user/'+user._id;

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
     
     let url ='http://localhost:3000/user/'+user._id;

     return this.http.put(url,body,options).map(res => res.json());   
  }

  retornarHeader():RequestOptions{
    let authToken = window.localStorage.getItem('token');    
    let headers = new Headers({ 'Authorization': 'Bearer ' + authToken });
    
    headers.append('Content-Type', 'Authorization');
    
    let options = new RequestOptions({ headers: headers });
    return options;
  }
  
}