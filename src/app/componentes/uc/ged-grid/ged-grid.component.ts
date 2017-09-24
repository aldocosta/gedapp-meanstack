import { Component, OnChanges, Input, Output, EventEmitter, NgZone } from '@angular/core';

@Component({
  selector: 'app-ged-grid',
  templateUrl: './ged-grid.component.html',
  styleUrls: ['./ged-grid.component.css']
})
export class GedGridComponent implements OnChanges {
  @Input() columns : any[];
  @Input() objProps : any[];
  @Input() datasource : any;
  @Input() dateMask: any;   
  @Input() deleteButtonHidden: boolean;
  @Input() selectButtonHidden: boolean;  
  @Input() pageSize: number;  
  
  @Output() selecionar: EventEmitter<any> = new EventEmitter();  
  @Output() remover: EventEmitter<any> = new EventEmitter();  

  pages = [];
  page : number;
  productsChunks = [];

  constructor(private zone: NgZone) {     
    this.page = this.page || 0;
    this.pageSize = this.pageSize || 3;
  }

  ngOnChanges(changes : any) {
    if(changes["datasource"].currentValue!=changes["datasource"].previousValue){
      if(changes["datasource"].currentValue.length>0){
        this.pages = [];
        let chunkSize = this.pageSize;
        let c = 1;
        for(let i=0; i< this.datasource.length; i+= chunkSize){
           this.productsChunks.push(this.datasource.slice(i,i+chunkSize));
           this.pages.push(c);
           c++;
        }
        this.datasource = this.productsChunks.length> 0 ? this.productsChunks[0] : [];        
      }
    }    
  }

  paginate(i){
    //this.zone.run(()=>{
    //this.productsChunks[i-1];      
    this.page = i-1;
    //});
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
