import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGeneric',
  pure:false
})
export class FilterGenericPipe implements PipeTransform {
  
  transform(value: [string], args?: any): any {
    if(args[0]==undefined || args[0]=='') return value;
    if(!value) return value;
  	let valor = args[2].filter((obj)=> {
      return obj[args[1]].toLowerCase().indexOf(args[0].toLowerCase())>-1;      
    });	

    if(valor.length> args[3]){
      valor = valor.splice(0,args[3]);
    }

    return valor;
  }

}
