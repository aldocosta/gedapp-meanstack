import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ged-grid',
  templateUrl: './ged-grid.component.html',
  styleUrls: ['./ged-grid.component.css']
})
export class GedGridComponent implements OnInit {
  @Input() columns : any[];
  @Input() objProps : any[];
  @Input() datasource : any;
  @Input() dateMask: any;   
  @Input() controls: any[];
  
  @Output() selecionar: EventEmitter<any> = new EventEmitter();  
  @Output() remover: EventEmitter<any> = new EventEmitter();  

  constructor() { }

  ngOnInit() {
    if(this.controls.length == 0)    {
      this.controls.push(true);
      this.controls.push(true);
    }
  }

  selecionarLinha(entidade){
    this.selecionar.emit(entidade);
    return false;
  }

  deletarLinha(entidade){
    this.remover.emit(entidade);
    return false;
  }

}
