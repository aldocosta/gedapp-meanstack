import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {LogarUsuarioService } from './services/logar/logar-usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LogarUsuarioService]
})
export class AppComponent {
  menustate:boolean;
  usuario:any;
  // usuario:{};
  constructor(
    private router:Router,
    private ls:LogarUsuarioService){
    this.menustate = false;    
  }

  onActivate(component){
    //inferindo no estado do menu
    let usuario = this.ls.pegarUsuarioLogadoViaLocalStorage();
    if(usuario)
      this.usuario = usuario.user;
    
    this.menustate = (usuario != undefined) && (usuario != null);    
  }
}
