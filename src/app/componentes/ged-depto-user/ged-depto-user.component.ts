import { Component, OnInit } from '@angular/core';

import { GedDeptoService } from '../../services/deptos/ged-depto.service';
import {LogarUsuarioService } from '../../services/logar/logar-usuario.service';

import { GedDepartamento } from '../../Models/ged-departamento';
import { User } from '../../Models/user';

@Component({
  selector: 'app-ged-depto-user',
  templateUrl: './ged-depto-user.component.html',
  styleUrls: ['./ged-depto-user.component.css'],
  providers:[GedDeptoService]
})
export class GedDeptoUserComponent implements OnInit {
  geddpto: any[];

  constructor(private _deptoService: GedDeptoService,
              private _lus: LogarUsuarioService) { }

  ngOnInit() {
  	this.loadAll();
  }

private loadAll(){
	this._deptoService.retornardepartamentos().subscribe(ret =>{
	  let obj : any;
	  ret.forEach(element => {
	    element.owner = element.owner[0].name;
	    element.ownerId = element.owner[0].id;        
	  });
	  this.geddpto = ret;
	});
}

}
