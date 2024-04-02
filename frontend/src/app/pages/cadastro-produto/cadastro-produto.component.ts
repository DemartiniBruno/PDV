import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Produto } from '../../Produto';
import { ProdutosService } from '../../services/produtos.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.css'
})
export class CadastroProdutoComponent {
  
  constructor(private produtoService: ProdutosService, private router: Router) { }

  produto = {
    nome: '',
    codigo_barras: null,
    valor_venda: '0',
    quantidade: '0',
  }

  cadastrarProduto() {
    this.produtoService.saveProduto(this.produto).subscribe((resultado:any) => {
      if(resultado.status === 200){
        alert(resultado.message)
        this.router.navigate(['/produtos'])
      } else {
        alert(resultado.message)
      }
    })
  }
}
