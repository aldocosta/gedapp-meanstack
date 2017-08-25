import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/catch';

import { PostsService } from '../posts.service';
import { User } from '../Models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']  
})
export class UsersComponent implements OnInit {
  users: any = [];   
  user: User;
  modalAction:string;
  filtertitleValue:string;
  modalState:boolean;
  visible:boolean;

  constructor(private postsService: PostsService,
              private router: Router,
              private zone:NgZone) {
    this.user = new User();     
    this.user.roles=[];
    this.modalAction = "Editar";    
   }

  ngOnInit() {
    this.filtertitleValue = '';  
    this.visible = true;  
    this.postsService.getAllUsers()
    .subscribe(ret => {
      this.zone.run(()=>{
        this.users = ret;
        this.visible = false;
      });
      
    },err=>{
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
        let index = this.users.indexOf(user);
        this.users.splice(index,1);
      });
   }
 }

 update(user){
       this.postsService.updateUser(user).subscribe(users => {
          let index = users;          
        });   
 }

}