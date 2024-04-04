import { Component } from '@angular/core';
import { VendasService } from '../../services/vendas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendas } from '../../Vendas';
import {MatTableModule} from '@angular/material/table';
import { Produto } from '../../Produto';
import { Itens_venda } from '../../Itens_venda';

@Component({
  selector: 'app-detalhe-venda',
  templateUrl: './detalhe-venda.component.html',
  styleUrl: './detalhe-venda.component.css'
})

export class DetalheVendaComponent {
  
  venda:Vendas={
    id: 0,
    numero_venda: 0,
    valor_total: 'string',
    status: 0,
    data_emissao: null,
    createdAt: null,
    updatedAt: null,
    deletedAt: null,

  }
  itens_venda:Itens_venda[] = [{
    id:0,
    quantidade:'',
    valor_unitario:'',
    valor_total_item:'',
    createdAt:null,
    updatedAt:null,
    deletedAt:null,
    produto_id:0,
    venda_id:0,
    produto:{
      id: 0,
      nome: '',
      codigo_barras: null,
      valor_venda: '',
      quantidade: '',
      createdAt: null,
      updatedAt: null,
      deletedAt: null
    }
  }]

  nome_coluna:string[] = ['id', 'nome', 'quantidade', 'valor_unitario', 'valor_total_item']

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
    })
  }
}
