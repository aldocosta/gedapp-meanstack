import { Component, OnChanges, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';

@Component({
  selector: 'app-ged-grid',
  templateUrl: './ged-grid.component.html',
  styleUrls: ['./ged-grid.component.css']
})
export class GedGridComponent implements  OnChanges {
  @Input() columns : any[];
  @Input() objProps : any[];
  @Input() datasource : any;
  @Input() dateMask: any;   
  @Input() deleteButtonHidden: boolean;
  @Input() selectButtonHidden: boolean;  
  @Input() pageSize: any;  
  @Input() filterKey: String;  
  @Input() filterVisibility: boolean;  

  @Output() selecionar: EventEmitter<any> = new EventEmitter();  
  @Output() remover: EventEmitter<any> = new EventEmitter();  

  pages = [];
  page : number;
  productsChunks = [];
  ps : number ;

  constructor(private zone: NgZone) {     
    this.page = this.page || 0;
    this.pageSize = this.pageSize || 3;
    this.filterVisibility = this.filterVisibility || true;
    this.filterKey = this.filterKey || "name";
  }
    
  ngOnChanges(changes : any) {
    this.pages = [];
    let chunkSize = this.pageSize;              
    let c = 1;
    this.productsChunks = [];
    if(this.datasource)
      for(let i=0; i< this.datasource.length; i+= chunkSize){
         this.productsChunks.push(this.datasource.slice(i,i+chunkSize));
         this.pages.push(c);
         c++;
      }
  }

  paginate(i){    
    this.page = i-1;    
    return false;
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
