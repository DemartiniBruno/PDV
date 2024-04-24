import { Component } from '@angular/core';
import { Vendas } from '../../Vendas';
import { VendasService } from '../../services/vendas.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrl: './vendas.component.css'
})
export class VendasComponent {
  vendas: Vendas[] = []

  constructor(private vendasService: VendasService){
    this.getVendas()
  }

  getVendas(): void{
    this.vendasService.getAll().subscribe(vendas => {
      this.vendas = vendas
      this.vendas.forEach(venda=>{
        switch(venda.status){
          case 0:
            venda.status='Venda Pendente'
            break
          case 1:
            venda.status='Venda Concluída'
            break
          case 2:
            venda.status='Venda Cancelada'
        }
      })
    })

  }


  colunas=['id' , 'numero_venda', 'status', 'valor_total']
  clickedRows = new Set<Vendas>()
}
