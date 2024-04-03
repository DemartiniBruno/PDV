import { Component, Input } from '@angular/core';
import { Produto } from '../../Produto';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-lista-dados',
  templateUrl: './lista-dados.component.html',
  styleUrl: './lista-dados.component.css',
  
})
export class ListaDadosComponent {
  // @Input() dados:Produto[] = []
  @Input() dados:any
  @Input() router:string = ''
  @Input() nome_coluna:String[] = []
  @Input() clickedRows:any


  constructor(private route: Router){}
  // this.clickedRows = new Set<Produto>();
  
  // teste(){
  //   const teste = this.clickedRows
  //   console.log(teste)
  //   clickedRow of clickedRows; track clickedRow
  // }

  redirecionar(){
    this.clickedRows.forEach((dado: any)=>{
      this.route.navigate([`${this.router}/${dado.id}`])
    })
  }

}
