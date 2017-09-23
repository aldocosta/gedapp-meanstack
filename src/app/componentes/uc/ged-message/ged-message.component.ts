import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ged-message',
  templateUrl: './ged-message.component.html',
  styleUrls: ['./ged-message.component.css']
})
export class GedMessageComponent implements OnInit {
  @Input() target : string;
  targetName:string;
  constructor() {     
  }

  ngOnInit() {    this.targetName = this.target;
    
  }

  dosome(){    
    // var ret = $('#targetName');
    // ret.modal('show');
    // console.log(ret);
  }

  

}
