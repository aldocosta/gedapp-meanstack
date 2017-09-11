import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGeneric',
  pure:false
})
export class FilterGenericPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }
  transform(value: [string], args?: any): any {
    if(!value) return value;
  	let valor = value.filter((obj)=> {
      return obj[args[1]].toLowerCase().indexOf(args[0].toLowerCase())>-1;      
    });	
    return valor;
  }

}
