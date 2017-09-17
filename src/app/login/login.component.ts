import { Component, OnChanges, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LogarUsuarioService } from '../services/logar/logar-usuario.service';
import { User } from '../Models/user'; 

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LogarUsuarioService]
})
export class LoginComponent implements OnChanges {
  user: User;
  fail: String;  
    
  constructor(private ls:LogarUsuarioService,              
              private router: Router,
              private zone:NgZone) {
    this.user = new User();
    let usuario = this.ls.pegarUsuarioLogadoViaLocalStorage();
    if(usuario){
      this.router.navigate(['/users']);
    }
          
   }

  ngOnChanges() {
  }

  logar(){ 
    this.ls.logar(this.user).catch(err=> {
        let i=0;
         return err.json();
      }
    ).subscribe(ret =>{      
      this.zone.run(()=>{
        if(ret.falha!=undefined){
          this.fail = ret.falha;
        }   
        else{          
          window.localStorage.setItem('token', ret.token);
          window.localStorage.setItem('usuario',JSON.stringify(ret));                    
          this.router.navigate(['/users']);          
        }
      });      
    });
  } 
}