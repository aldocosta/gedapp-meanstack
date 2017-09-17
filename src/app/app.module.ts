import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
  
import { PostsService } from './posts.service';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { ExtrasComponent } from './extras/extras.component';
import { UsersComponent } from './users/users.component';

import { UserFilterPipePipe } from './pipes/user-filter-pipe.pipe';

import { LoginComponent } from './login/login.component';
import { GedMenuComponent } from './ged-menu/ged-menu.component';
import { GedDepartamentoComponent } from './componentes/ged-departamento/ged-departamento.component';
import { FilterGenericPipe } from './pipes/filter-generic.pipe';
import { GedGridComponent } from './componentes/uc/ged-grid/ged-grid.component';
import { AppCommomService } from './services/app-commom.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent }  ,
  //{ path: 'extra', component: ExtrasComponent }  ,
  { path: 'users', component: UsersComponent },
  { path: 'depto',component:GedDepartamentoComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    ExtrasComponent,
    UsersComponent,
    UserFilterPipePipe,
    LoginComponent,    
    GedMenuComponent, GedDepartamentoComponent, FilterGenericPipe, GedGridComponent 
  ],
  imports: [
    BrowserModule,    
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)    
  ],
  providers: [
              PostsService,
              AppCommomService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }