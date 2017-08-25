import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
  
import { PostsService } from './posts.service';
import {MySharedService } from './services/shared/my-shared.service';
//import { LogarUsuarioService } from './services/logar/logar-usuario.service';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { ExtrasComponent } from './extras/extras.component';
import { UsersComponent } from './users/users.component';

import { UserFilterPipePipe } from './pipes/user-filter-pipe.pipe';

import { LoginComponent } from './login/login.component';
import { GedMenuComponent } from './ged-menu/ged-menu.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    component: PostsComponent
  }  
];

const appRoutes: Routes = [
  { path: '', component: LoginComponent }  ,
  { path: 'extra', component: ExtrasComponent }  ,
  { path: 'users', component: UsersComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    ExtrasComponent,
    UsersComponent,
    UserFilterPipePipe,
    LoginComponent,    
    GedMenuComponent 
  ],
  imports: [
    BrowserModule,    
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)    
  ],
  providers: [
              PostsService,
              MySharedService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }