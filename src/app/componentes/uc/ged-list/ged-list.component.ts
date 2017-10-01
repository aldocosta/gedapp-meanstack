import { Component, OnInit,OnChanges ,Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ged-list',
  templateUrl: './ged-list.component.html',
  styleUrls: ['./ged-list.component.css']
})
export class GedListComponent implements OnChanges {	

  @Input() datasource: any;
  @Input() name: string;
  @Input() title:string;

  @Output() selecionar: EventEmitter<any> = new EventEmitter();    

  _datasource:any;
  _name:string;
  _title:string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(value:any){
  	this._datasource = this.datasource[0];
  	this._name = this.datasource[1];
  	this._title = this.datasource[2];
  }

  selecionarLinha(entidade){
    this.selecionar.emit(entidade);
    return false;
  }

}
