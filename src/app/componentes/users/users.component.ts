import { Component, OnInit, NgZone,  Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { trigger, state, style, animate,  transition} from '@angular/animations';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { PostsService } from '../../services/posts.service';
import { LogarUsuarioService } from '../../services/logar/logar-usuario.service';
import { ErrorHandlingHelperService } from '../../services/errorHandling/error-handling-helper.service';

import { User } from '../../Models/user';

@Component({
  selector: 'app-users',
  providers: [LogarUsuarioService],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'] ,
    animations: [
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)',
        opacity:0
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)',
        opacity:1
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('2000ms ease-out'))
    ])
  ] 
})
export class UsersComponent implements OnInit {
  users = [];   
  user: User;
  modalAction:string;
  filtertitleValue:string;
  modalState:boolean;
  visible:boolean;
  _id:string;
  usuario :{};
  filterKey:string;
  state:String;
  msg: String;


  constructor(private postsService: PostsService,
              private router: Router,
              private route: ActivatedRoute,
              private zone: NgZone,
              private ls: LogarUsuarioService,
              private ehs: ErrorHandlingHelperService) {
    this.user = new User();     
    this.user.roles=[];
    this.modalAction = "Editar";    
    this._id='UsersComponent';   
    this.filterKey = 'email';
   }

  ngOnInit() {
    this.filtertitleValue = '';  
    this.visible = true;
    this.loadAll();    
  }

  editar(user:any){          
    this.user = user;    
    this.modalAction = "Editar";
    this.modalState = false;
  }

  novo(){
    this.modalAction = "Novo";
    this.user = new User();
    this.user.roles =[];
    this.modalState = true;
  }

 salvar(){
     if(!this.user.nome){
       this.showMessage('Nome obrigatorio');  
     }else
     {
        this.postsService.postUser(this.user).subscribe(users => {
            this.loadAll();          
        },err=>{
          let errParsed = JSON.parse(err.message);
            if(errParsed.status=='401'){
            this.ls.logoff();
            this.router.navigate(['/']);
          }      
        });
      }
 }

 pushRole(role){ 
   if(role.checked)  {
     this.user.roles.push(role.value);     
   }else{
     let index = this.user.roles.indexOf(role.value);
     this.user.roles.splice(index,1);
   }
 }

 remover(user){
   if(confirm('Deseja remover este usuário?')){
     this.postsService.deleteUser(user).subscribe(users => {
        this.zone.run(()=>{          
          this.loadAll();          
        });        
      },err=>{
      this.ls.logoff();
      this.router.navigate(['/']);      
    });
   }
 }

 update(user){
  this.postsService.updateUser(user).subscribe(users => {
      let index = users;          
    },err=>{
    this.ls.logoff();
    this.router.navigate(['/']);      
  });   
 }

loadAll(){
    this.state ='inactive';
    this.postsService.getAllUsers().catch((err)=>{
      console.log(err);
      this.ehs.errorHandler(err);
        /*let errParsed = JSON.parse(err.message);
          if(errParsed.status=='401'){
          this.ls.logoff();
          this.router.navigate(['/']);
        } */     
      return err;
    })
    .subscribe(ret => {
        this.users = ret;
        this.visible = false;
    });
/*  this.postsService.getAllUsers()
    .subscribe(ret => {
        this.users = ret;
        this.visible = false;
    },err=>{
      this.ls.logoff();
      this.router.navigate(['/']);      
    });*/
  }

 showMessage(msg:String) {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.msg = msg;
    setTimeout(100,()=>{
      this.state ='inactive';
    });
 }



}