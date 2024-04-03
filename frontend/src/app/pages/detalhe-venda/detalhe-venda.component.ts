import { Component } from '@angular/core';
import { VendasService } from '../../services/vendas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendas } from '../../Vendas';

@Component({
  selector: 'app-detalhe-venda',
  templateUrl: './detalhe-venda.component.html',
  styleUrl: './detalhe-venda.component.css'
})
export class DetalheVendaComponent {
  
  venda!:Vendas
  itens_venda!:any[]

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
