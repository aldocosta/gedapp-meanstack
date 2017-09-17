import { Component, OnInit, NgZone } from '@angular/core';

import { GedDeptoService } from '../../services/deptos/ged-depto.service';
import { GedDepartamento } from '../../Models/ged-departamento';
import {LogarUsuarioService } from '../../services/logar/logar-usuario.service';
import {User } from '../../Models/User';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-ged-departamento',
  templateUrl: './ged-departamento.component.html',
  styleUrls: ['./ged-departamento.component.css'],
  providers:[GedDeptoService]
})
export class GedDepartamentoComponent implements OnInit {
  geddpto: any[];
  filtertitleValue: string;
  depto: GedDepartamento;
  userlogged: User;

  constructor(private _deptoService: GedDeptoService,
              private _lus: LogarUsuarioService,
              private zone: NgZone) { }

  ngOnInit() {

    this._deptoService.retornardepartamentos().subscribe(ret =>{
      let obj : any;
      ret.forEach(element => {
        element.owner = element.theOwner[0].name;
        element.ownerId = element.theOwner[0].id;
        delete element.theOwner;        
      });
      this.geddpto = ret;      
    });
    this.filtertitleValue = '';
    this.depto = new GedDepartamento();    
    this.userlogged = this._lus.pegarUsuarioLogadoViaLocalStorage().user;
    this.depto.owner = this.userlogged.nome;
    this.depto.id = this.userlogged.id;
  }

  editar(depto:any){
    this.depto = depto;    
  }

  salvarEditar(){
    this._deptoService.editarDepartamento(this.depto);
  }

  deletarDepto(depto:any){
    let i = this.geddpto.indexOf(depto);
    this.geddpto.splice(i,1);
    //this._deptoService.deletarDepartamento(depto);    
    //this.geddpto = this._deptoService.retornardepartamentos();
  }

  salvarNovo():void{    
    this.geddpto.push(this.depto);
  }

}
