import { Injectable } from '@angular/core';

import { GedDepartamento } from '../../Models/ged-departamento';

@Injectable()
export class GedDeptoService {
  g: GedDepartamento[];

  constructor() { 
    this.g = [];
  }

  retornardepartamentos():GedDepartamento[]{    
    this.g.push(this.genNewDepto(1,'Fiscal','Depto Fiscalização',new Date(),null,'Admin',null));
    this.g.push(this.genNewDepto(2,'Transportes','Maina',new Date(),null,'User',null));
    this.g.push(this.genNewDepto(3,'Juridico','Advogados',new Date(),null,'User',null));    
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

                        

  private genNewDepto(id,nome,descricao,criacao,owner,pai,paiid){
    let dep = new GedDepartamento();
    dep.id=id;
    dep.nome = nome;
    dep.Descricao = descricao;
    dep.Criacao = criacao;
    dep.Owner = owner;
    dep.Pai = pai;
    dep.PaiId = paiid;
    return dep;
  }
}
