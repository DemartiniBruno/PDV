import { Component, Input } from '@angular/core';
import { Produto } from '../../Produto';

@Component({
  selector: 'app-lista-dados',
  templateUrl: './lista-dados.component.html',
  styleUrl: './lista-dados.component.css'
})
export class ListaDadosComponent {
  // @Input() dados:Produto[] = []
  @Input() dados:any
  @Input() router:string = ''
}
