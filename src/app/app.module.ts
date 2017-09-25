import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
  
import { PostsService } from './services/posts.service';

import { AppComponent } from './app.component';
import { ExtrasComponent } from './extras/extras.component';
import { UsersComponent } from './componentes/users/users.component';

import { UserFilterPipePipe } from './pipes/user-filter-pipe.pipe';

import { LoginComponent } from './login/login.component';
import { GedMenuComponent } from './componentes/uc/ged-menu/ged-menu.component';
import { GedDepartamentoComponent } from './componentes/ged-departamento/ged-departamento.component';
import { FilterGenericPipe } from './pipes/filter-generic.pipe';
import { GedGridComponent } from './componentes/uc/ged-grid/ged-grid.component';
import { AppCommomService } from './services/app-commom.service';
import { GedMessageComponent } from './componentes/uc/ged-message/ged-message.component';
import { GedDeptoUserComponent } from './componentes/ged-depto-user/ged-depto-user.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent }  ,
  { path: 'users', component: UsersComponent },
  { path: 'depto',component:GedDepartamentoComponent},
  { path: 'depto_user',component:GedDeptoUserComponent}
];


@NgModule({
  declarations: [
    AppComponent,    
    ExtrasComponent,
    UsersComponent,
    UserFilterPipePipe,
    LoginComponent,    
    GedMenuComponent, GedDepartamentoComponent, FilterGenericPipe, GedGridComponent, GedMessageComponent, 
    GedDeptoUserComponent 
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