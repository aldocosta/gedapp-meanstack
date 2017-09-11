import { Injectable } from '@angular/core';

import { GedDepartamento } from '../../Models/ged-departamento';

@Injectable()
export class GedDeptoService {
  g: GedDepartamento[];

  constructor() { 
    this.g = [];
    this.g.push(this.genNewDepto(1,'Fiscal','Depto Fiscalização',new Date(),'Admin'));
    this.g.push(this.genNewDepto(2,'Transportes','Maina',new Date(),'User'));
    this.g.push(this.genNewDepto(3,'Juridico','Advogados',new Date(),'User'));    
  }

  retornardepartamentos():GedDepartamento[]{    
    return this.g;
  }

  editarDepartamento(depto: GedDepartamento){
    this.g.forEach(element => {
      if(element.id==depto.id){
        element = depto;
      }
    });
  }

  deletarDepartamento(depto:GedDepartamento):void{
    let i = this.g.indexOf(depto);
    this.g.slice(i,1);
  }
                        

  private genNewDepto(id,nome,descricao,criacao,owner){
    let dep = new GedDepartamento();
    dep.id=id;
    dep.nome = nome;
    dep.Descricao = descricao;
    dep.Criacao = criacao;
    dep.Owner = owner;        
    return dep;
  }
}
