import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { PostsService } from '../../services/posts.service';
import { LogarUsuarioService } from '../../services/logar/logar-usuario.service';
import { User } from '../../Models/user';

@Component({
  selector: 'app-users',
  providers: [LogarUsuarioService],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']  
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

  constructor(private postsService: PostsService,
              private router: Router,
              private route: ActivatedRoute,
              private zone: NgZone,
              private ls: LogarUsuarioService) {
    this.user = new User();     
    this.user.roles=[];
    this.modalAction = "Editar";    
    this._id='UsersComponent';    
   }

  ngOnInit() {
    this.filtertitleValue = '';  
    this.visible = true;
    
    let u = this.ls.pegarUsuarioLogadoViaLocalStorage();

    this.postsService.getAllUsers()
    .subscribe(ret => {
      this.zone.run(()=>{
        this.users = ret;
        this.visible = false;
      });
      
    },err=>{
      this.ls.logoff();
      this.router.navigate(['/']);      
    });
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
    this.postsService.postUser(this.user).subscribe(users => {
      this.users.push(users);      
    },err=>{
      this.ls.logoff();
      this.router.navigate(['/']);      
    });
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
        //this.zone.run(()=>{
           //this.users = users;
          // this.visible = false;
          let index = this.users.indexOf(user);
          this.users.splice(index,1);
        //});        
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

}