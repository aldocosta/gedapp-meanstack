import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LogarUsuarioService } from '../../services/logar/logar-usuario.service';

@Injectable()
export class ErrorHandlingHelperService {

  constructor(private ls: LogarUsuarioService,
  			  private router: Router,) { }

  public errorHandler(err){
  	let errParsed = JSON.parse(err.message);
  	if(errParsed==null){
  		throw err;  		  		
  	}
  	switch (errParsed.status) {
  		case 401:/*login expirado*/
		  this.ls.logoff();
          this.router.navigate(['/']);
  			break;  		
  		default:
  			// code...
  			break;
  	}
  }

}
