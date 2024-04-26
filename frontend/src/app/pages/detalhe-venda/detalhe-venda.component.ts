import { Component } from '@angular/core';
import { VendasService } from '../../services/vendas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendas } from '../../Vendas';
import { MatTableModule } from '@angular/material/table';
import { Produto } from '../../Produto';
import { Itens_venda } from '../../Itens_venda';

@Component({
  selector: 'app-detalhe-venda',
  templateUrl: './detalhe-venda.component.html',
  styleUrl: './detalhe-venda.component.css'
})

export class DetalheVendaComponent {

  venda: Vendas = {
    id: 0,
    numero_venda: 0,
    valor_total: 'string',
    status: 0,
    data_emissao: null,
    createdAt: null,
    updatedAt: null,
    deletedAt: null,

  }
  itens_venda: Itens_venda[] = [{
    id: 0,
    quantidade: '',
    valor_unitario: '',
    valor_total_item: '',
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
    produto_id: 0,
    venda_id: 0,
    produto: {
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

  nome_coluna: string[] = ['id', 'nome', 'quantidade', 'valor_unitario', 'valor_total_item']

  constructor(
    private vendasService: VendasService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.consultarVenda()
  }

  consultarVenda() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.vendasService.getOne(id).subscribe(venda => {
      this.venda = venda
      switch(this.venda.status){
        case 0:
          this.venda.status='Venda Pendente'
          break
        case 1:
          this.venda.status='Venda Concluída'
          break
        case 2:
          this.venda.status='Venda Cancelada'
      }
      console.log(this.venda.data_emissao)
      this.venda.createdAt = this.formataData(this.venda.createdAt)
      if(this.venda.status===1){
        this.venda.data_emissao = this.formataData(this.venda.data_emissao)
      }
      this.itens_venda = venda.itens_vendas
    })
  }

  formataData(data: any){
    const dataFormatada = {
      dia: data.split('T').splice(0,1).toString().split('-').reverse().join('/'),
      hora: data.split('T').splice(1,1).toString().split('.').splice(0,1).toString()
    }

    const novaData = `${dataFormatada.dia} ${dataFormatada.hora}`

    return novaData
  }

  concluirVenda() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.vendasService.concluiVenda(id).subscribe(retorno=>(console.log(retorno)))
    this.router.navigate([`/vendas/`])
  }

  deletarVenda(){
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.vendasService.deleteVenda(id).subscribe(retorno=>(console.log(retorno)))
    this.router.navigate([`/vendas/`])
  }
}
