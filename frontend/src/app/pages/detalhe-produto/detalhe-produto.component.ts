import { Component, input } from '@angular/core';
import { Produto } from '../../Produto';
import { ProdutosService } from '../../services/produtos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrl: './detalhe-produto.component.css'
})
export class DetalheProdutoComponent {

  produto = {
    nome: '',
    codigo_barras: null,
    valor_venda: '0',
    quantidade: '0',
  }

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.consultarItem()
  }

  consultarItem(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.produtosService.getOne(id).subscribe(produtos => (this.produto = produtos))
  }

  editarItem():void{
    const id = Number(this.route.snapshot.paramMap.get('id'))
    // this.produtosService.putProduto(id, this.produto).subscribe(produtos => (this.produto = produtos))
    this.produtosService.putProduto(id, this.produto).subscribe((resultado:any) => {
      this.consultarItem()
      if(resultado.status === 200){
        alert(resultado.message)
        // this.router.navigate(['/produtos'])
      } else {
        alert(resultado.message)
      }
    })
  }

  apagarItem(){
    const id = Number(this.route.snapshot.paramMap.get('id'))
    // this.produtosService.putProduto(id, this.produto).subscribe(produtos => (this.produto = produtos))
    this.produtosService.deleteProduto(id).subscribe((resultado:any) => {
      this.consultarItem()
      if(resultado.status === 200){
        alert(resultado.message)
        this.router.navigate(['/produtos'])
      } else {
        alert(resultado.message)
      }
    })
  }
}
