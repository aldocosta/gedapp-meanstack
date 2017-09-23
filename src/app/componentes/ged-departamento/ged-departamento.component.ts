import { Component, OnInit, NgZone } from '@angular/core';

import { GedDeptoService } from '../../services/deptos/ged-depto.service';
import { LogarUsuarioService } from '../../services/logar/logar-usuario.service';

import { GedDepartamento } from '../../Models/ged-departamento';
import { User } from '../../Models/user';

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
  modalStateNovo: boolean;

  constructor(private _deptoService: GedDeptoService,
              private _lus: LogarUsuarioService,
              private zone: NgZone) {
       this.depto = new GedDepartamento();
  }

  ngOnInit() {
    this.loadAll();
    this.filtertitleValue = '';
    this.userlogged = this._lus.pegarUsuarioLogadoViaLocalStorage().user;
    this.starNewDepto() ;  
  }

  novo(){
    this.modalStateNovo = true;   
    this.starNewDepto() ;
  }

  editar(depto:any){
    this.depto = depto;    
    this.modalStateNovo = false;
  }

  salvarEditar(){
    this._deptoService.updateDepto(this.depto).subscribe(ret=>{      
    });
  }

  deletarDepto(depto:any){
    if(confirm('Deseja remover este departamento?')){
      this._deptoService.deletarDepartamento(depto).subscribe((ret)=>{
        let i = this.geddpto.indexOf(depto);    
        this.geddpto.splice(i,1);    
      });      
    }
  }

  salvarNovo():void{
    this._deptoService.salvarDepartamento(this.depto).subscribe(depto => {      
      this.loadAll();
    });
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

  private starNewDepto(){
    this.depto = new GedDepartamento();
    this.depto.owner = this.userlogged.nome;
    this.depto.ownerId = this.userlogged.id;    
    this.depto.criacao = new Date();
  }

}
