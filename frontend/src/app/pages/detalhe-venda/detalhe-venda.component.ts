import { Component } from '@angular/core';
import { VendasService } from '../../services/vendas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendas } from '../../Vendas';
import {MatTableModule} from '@angular/material/table';

export interface Itens_venda {
  id:number,
  quantidade:string,
  valor_unitario:string,
  valor_total_item:string,
  createdAt:any,
  updatedAt:any,
  deletedAt:any,
  produto_id:number,
  venda_id:number,
  produto: any
}

@Component({
  selector: 'app-detalhe-venda',
  templateUrl: './detalhe-venda.component.html',
  styleUrl: './detalhe-venda.component.css'
})




export class DetalheVendaComponent {

  teste(id:any){
    console.log('teste', id)
  }
  
  venda!:Vendas
  itens_venda!:Itens_venda[]

  displayColumns2: string[] = ['id', 'nome', 'quantidade', 'valor unitario', 'valor total']
  dataSource2 = this.itens_venda

  constructor(
    private vendasService: VendasService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.consultarVenda()
  }

  consultarVenda (){
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.vendasService.getOne(id).subscribe(venda=>{
      this.venda = venda
      this.itens_venda=venda.itens_vendas
      console.log(this.venda)
      console.log(this.itens_venda)
      
    })
  }
}
