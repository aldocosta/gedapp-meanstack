import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilterPipe',
  pure:false
})
export class UserFilterPipePipe implements PipeTransform {

  transform(value: [string], args?: any): any {
  	let valor = value.filter((obj)=>{
  		return obj['name'].toLowerCase().indexOf(args)>-1;
  	});	
    return valor;
  }

}
