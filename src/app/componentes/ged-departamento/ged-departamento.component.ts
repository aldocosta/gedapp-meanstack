import { Component, OnInit } from '@angular/core';

import { GedDeptoService } from '../../services/mock/depto-mock.service';
import { GedDepartamento } from '../../Models/ged-departamento';
import {LogarUsuarioService } from '../../services/logar/logar-usuario.service';
import {User } from '../../Models/User';

@Component({
  selector: 'app-ged-departamento',
  templateUrl: './ged-departamento.component.html',
  styleUrls: ['./ged-departamento.component.css'],
  providers:[GedDeptoService]
})
export class GedDepartamentoComponent implements OnInit {
  geddpto: GedDepartamento[];
  filtertitleValue: string;
  depto: GedDepartamento;
  userlogged: User;

  constructor(private _deptoService: GedDeptoService,
              private _lus: LogarUsuarioService) { }

  ngOnInit() {
    this.filtertitleValue = '';
    this.depto = new GedDepartamento();    
    this.userlogged = this._lus.pegarUsuarioLogadoViaLocalStorage().user;
    this.geddpto = this._deptoService.retornardepartamentos();

    this.depto.Owner = this.userlogged.nome;
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
