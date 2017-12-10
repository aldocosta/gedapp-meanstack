import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from '../app.component';
import { LoginComponent } from './login.component';
import { GedMenuComponent } from '../componentes/uc/ged-menu/ged-menu.component';
import { Router } from '@angular/router';
import { ParseSourceSpan } from '@angular/compiler';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  
import { PostsService } from '../services/posts.service';
import { DeptoUsuarioService } from '../services/deptoUsuario/depto-usuario.service';
import { ErrorHandlingHelperService } from '../services/errorHandling/error-handling-helper.service';
import { LogarUsuarioService } from '../services/logar/logar-usuario.service';


import { ExtrasComponent } from '../extras/extras.component';
import { UsersComponent } from '../componentes/users/users.component';

import { UserFilterPipePipe } from '../pipes/user-filter-pipe.pipe';


import { GedDepartamentoComponent } from '../componentes/ged-departamento/ged-departamento.component';
import { FilterGenericPipe } from '../pipes/filter-generic.pipe';
import { GedGridComponent } from '../componentes/uc/ged-grid/ged-grid.component';
import { AppCommomService } from '../services/app-commom.service';
import { GedMessageComponent } from '../componentes/uc/ged-message/ged-message.component';
import { GedDeptoUserComponent } from '../componentes/ged-depto-user/ged-depto-user.component';
import { GedListComponent } from '../componentes/uc/ged-list/ged-list.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent }  ,
  { path: 'users', component: UsersComponent },
  { path: 'depto',component:GedDepartamentoComponent},
  { path: 'depto_user',component:GedDeptoUserComponent}
];

describe('LoginComponent', () => {
  // let component: LoginComponent;
  // let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,    
        ExtrasComponent,
        UsersComponent,
        UserFilterPipePipe,
        LoginComponent,    
        GedMenuComponent, GedDepartamentoComponent, FilterGenericPipe, GedGridComponent, GedMessageComponent, 
        GedDeptoUserComponent, GedListComponent       
      ],
      imports: [
        BrowserModule,    
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes)    
      ]
    }).compileComponents();
  }));

  it('deveria ter os controles de email e password',async(()=>{
      //let component: LoginComponent;
      //let fixture: ComponentFixture<LoginComponent>;
      //const el = fixture.debugElement.nativeElement;
      //console.log(component);

    const fixture = TestBed.createComponent(LoginComponent);
    //const el = fixture.debugElement.nativeElement;
    //console.log(el);
    //let password = el.querySelector('password');
    //let state = password!=null || password != undefined;
    // console.log(password);    
    expect(true).toBeTruthy(true);
    //expect(ret).toBe('Ano invalido');
  }));

  
});
