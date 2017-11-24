import { Component, OnInit, OnChanges, NgZone } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { GedDeptoService } from '../../services/deptos/ged-depto.service';
import { LogarUsuarioService } from '../../services/logar/logar-usuario.service';
import { PostsService } from '../../services/posts.service';
import { DeptoUsuarioService } from '../../services/deptoUsuario/depto-usuario.service';

import { GedDepartamento } from '../../Models/ged-departamento';
import { User } from '../../Models/user';
import { DeptoUsers } from '../../Models/depto-users';
import { UsuarioDepartamento } from '../../Models/usuario-departamento';

@Component({
  selector: 'app-ged-depto-user',
  templateUrl: './ged-depto-user.component.html',
  styleUrls: ['./ged-depto-user.component.css'],
  providers:[GedDeptoService]
})
export class GedDeptoUserComponent implements OnInit, OnChanges {
  geddpto: any[];
  users = [];
  deptoUser : DeptoUsers; // aqui seto a agregação de depto x users
  usuarioDeptoList : any = [];
  usuarioDepartamento : UsuarioDepartamento;
  filterKey:String; 
  pages = []; 
  pagesDepto = [];   
  page : number;
  pageDepto : number;  
  usersChunks = [];  
  deptoChunks = []; 
  chunkSize:number = 5;   
  listaDeptoCheck : any[] = [];
  usuarioDepartamentoLista = [];

  constructor(private _deptoService: GedDeptoService,
              private _lus: LogarUsuarioService,
              private zone: NgZone,
              private router: Router,
              private postsService: PostsService,
              private dus: DeptoUsuarioService) {
      this.filterKey = 'user';
    }

  ngOnInit() {
  	this.loadAll();
  }

  ngOnChanges() {

  }

  private loadAll(){
    this.usuarioDepartamento = new UsuarioDepartamento();
    this.deptoUser = new DeptoUsers();    

    this.loadDeptos();
    this.loadUsers();
    this.loadDeptoUsers();    
  }

  private loadDeptoUsers(){
    this.dus.retornarDepartamentoUsuarios().subscribe(ret=>{      
      let arr = [];
      ret.forEach((el)=>{
        let u = new UsuarioDepartamento();
        u._id = el._id;
        u.criacao  = el.criacao;
        u.depto  = el.depto[0].name;
        u.user  = el.user[0].name;        
        arr.push(u);
      });      
      this.usuarioDeptoList = arr;
    });    
  }

  private loadUsers(){    
    let c = 1;
    this.usersChunks = [];
    this.page=0;

    this.postsService.getAllUsers()
    .subscribe(ret => {
        for(let i=0; i< ret.length; i+= this.chunkSize){
          this.usersChunks.push(ret.slice(i,i+ this.chunkSize));
          this.pages.push(c);
          c++;
        }      
        this.users = this.usersChunks[this.page];      
    },err=>{
      this._lus.logoff();
      this.router.navigate(['/']);      
    });    
  }

  private loadDeptos(){
    this._deptoService.retornardepartamentos().subscribe(ret =>{      
        let obj : any;
        let c = 1;
        this.pageDepto = 0;        
        ret.forEach(element => {
          element.owner = element.owner[0].name;
          element.ownerId = element.owner[0].id;        
          element.deptoCheck = false;
          element.userCheck = false;
        });

        for(let i=0; i< ret.length; i+= this.chunkSize){
          this.deptoChunks.push(ret.slice(i,i+ this.chunkSize));
          this.pagesDepto.push(c);
          c++;
        }        
        this.geddpto = this.deptoChunks[this.pageDepto];
      });
  }

  private selecionarDepto(obj){    
    this.usuarioDepartamento.depto = obj._id;    
    this.usuarioDepartamento.deptoName = obj.name;    
  }

  private selecionarUsuario(obj){     
    this.usuarioDepartamento.user = obj._id;
    this.usuarioDepartamento.userName = obj.name;
  }

  public salvarSelecao(){    
    this.dus.salvarDepartamento(this.usuarioDepartamento).subscribe(ret=>{
      this.loadDeptoUsers();
    });    
  }

  private paginateUser(i){
    this.page = i-1;
    this.users = this.usersChunks[this.page];      
    return false;
  }

  private paginateDepto(i){
    this.pageDepto = i-1;
    this.geddpto = this.deptoChunks[this.pageDepto];      
    return false;      
  }

  private departamentoCheck(item){
    this.listaDeptoCheck = [];
    this.usersChunks.forEach((e)=>{      
      e.forEach((ei)=>{
        if(ei.userCheck){
            this.listaDeptoCheck.push(item);
            console.log(ei);
          }        
      });
    });
  }

  private gravarRelacao(){
    this.usersChunks.forEach((e)=>{      
      e.forEach((ei)=>{
        if(ei.userCheck){          
          this.deptoUser.userIds.push(ei._id);
        }
      });
    });
    this.dus.salvarDepartamentoLista(this.deptoUser).subscribe(ret=>{
      this.loadDeptoUsers();
    });
  }

  private setarDepartamento(departamento){
    this.deptoUser.deptoId=departamento._id;
    console.log(this.deptoUser.deptoId);
  }
}