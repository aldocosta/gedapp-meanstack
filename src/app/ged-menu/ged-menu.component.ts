import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { LogarUsuarioService } from '../services/logar/logar-usuario.service';

import {MySharedService } from '../services/shared/my-shared.service';

@Component({
  selector: 'app-ged-menu',
  templateUrl: './ged-menu.component.html',
  styleUrls: ['./ged-menu.component.css'],
  providers:[LogarUsuarioService,MySharedService]
})
export class GedMenuComponent implements OnInit {
  @Input() state;
  @Input() user;

  constructor(private ls:LogarUsuarioService,
              private router: Router,
              private mySharedService:MySharedService) {
  }

  ngOnInit() {    
    this.state = false;    
  }

  logOut(){
    this.state = false;
    this.ls.logoff();    
  }
}
