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
  
  @Output() editar: EventEmitter<any> = new EventEmitter();  
  @Output() remover: EventEmitter<any> = new EventEmitter();  

  constructor() { }

  ngOnInit() {
  }

  editarLinha(entidade):void{
    this.editar.emit(entidade);
  }

  deletarLinha(entidade):void{
    this.remover.emit(entidade);
  }

}
