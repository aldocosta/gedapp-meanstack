import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  @Output() 
  emitEvent = new EventEmitter();
  
  @Input()
  message:string = 'No message';
  
  public clickMe(){
    this.emitEvent.next('message from button');
  }

  constructor(private ls:LogarUsuarioService,
              private mySharedService:MySharedService) {
    this.ls.onGetData.subscribe(res => {
      
      console.log(res);
      this.state = true;
    });
  }

  ngOnInit() {
    this.mySharedService.getNavChangeEmitter().subscribe(item => {
      console.log('work something');});
  }

  doNothing(){
    console.log('Nada');
  }

  

}
