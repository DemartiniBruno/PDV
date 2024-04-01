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
    this.vendasService.getAll().subscribe(vendas => (this.vendas = vendas))
  }
}
