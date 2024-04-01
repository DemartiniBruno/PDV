import { Component } from '@angular/core';
import { Produto } from '../../Produto';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  produtos:Produto[]=[ ]

  constructor(private produtosService: ProdutosService){
    this.getProdutos();
  }

  getProdutos(): void{
    this.produtosService.getAll().subscribe(produtos => (this.produtos = produtos));
  }
}
