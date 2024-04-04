import { Component, ViewChild } from '@angular/core';
import { ProdutosService } from '../../services/produtos.service';
import { VendasService } from '../../services/vendas.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


export interface lista_itens {
  quantidade: string,
  valor_unitario: string,
  valor_total_item: string,
  produto_id: number,
  nome: string
}

@Component({
  selector: 'app-cadastro-venda',
  templateUrl: './cadastro-venda.component.html',
  styleUrl: './cadastro-venda.component.css',
  // standalone: true,
  // imports: [MatButtonModule, MatTableModule],
})

export class CadastroVendaComponent {
  item_id: any
  quantidade: number = 1

  @ViewChild(MatTable) table!: MatTable<lista_itens>;

  lista_itens: lista_itens[] = []

  nome_coluna: string[] = ['nome', 'quantidade', 'valor_unitario', 'valor_total_item']

  constructor(
    private produtosService: ProdutosService,
    private vendasService: VendasService,
    private router: Router
  ) { }

  adicionarItem() {
    // console.log(this.item_id, this.quantidade)
    const id = Number(this.item_id)
    this.produtosService.getOne(id).subscribe((produto) => {
      this.lista_itens.push({
        quantidade: String(this.quantidade),
        valor_unitario: produto.valor_venda,
        valor_total_item: String(this.quantidade * produto.valor_venda),
        produto_id: produto.id,
        nome: produto.nome
      })
      this.table.renderRows();
      console.log(this.lista_itens)
    })
  }

  salvar_nota() {
    const dados_nota = {
      numero_venda: 8,
      status: 0
    }
    this.vendasService.saveVenda(dados_nota).subscribe((nova_venda) => {
      this.lista_itens.forEach((item) => {
        this.vendasService.addProdutoVenda(item, nova_venda.id).subscribe((retorno) => console.log(retorno))
      })

      this.router.navigate([`/vendas/${nova_venda.id}`])
    })
  }
}
