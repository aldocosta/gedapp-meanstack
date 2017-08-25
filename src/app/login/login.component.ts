import { Component, OnChanges, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LogarUsuarioService } from '../services/logar/logar-usuario.service';
import { User } from '../Models/user'; 
import { MySharedService } from '../services/shared/my-shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LogarUsuarioService,MySharedService]
})
export class LoginComponent implements OnChanges {
  user: User;
  fail: String;  
    
  constructor(private ls:LogarUsuarioService,              
              private router: Router,
              private zone:NgZone,
              private mySharedService:MySharedService) {
    this.user = new User();    
   }

  ngOnChanges() {
  }

  logar(){ 
    this.ls.logar(this.user).catch(err=> err.json()).subscribe(ret =>{      
      this.zone.run(()=>{
        if(ret.falha!=undefined){
          this.fail = ret.falha;
        }   
        else{                
          window.localStorage.setItem('token', ret.token);                    
          this.router.navigate(['/users']);          
          document.getElementById('side-menu').style.display='block';
        }
      });      
    });
  }

  teste(){    
    this.mySharedService.emitNavChangeEvent(999);
  }
}