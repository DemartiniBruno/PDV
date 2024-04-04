import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendas } from '../Vendas';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  private apiUrl = 'http://localhost:3000/vendas'

  constructor(private http: HttpClient) { }

  getAll():Observable<Vendas[]>{
    return this.http.get<Vendas[]>(this.apiUrl)
  }

  getOne(id:any){
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

  saveVenda(dados_nota:any){
    return this.http.post<any>(this.apiUrl, dados_nota)
  }

  addProdutoVenda(item_lista:any, venda_id:number){
    return this.http.post<any>(`${this.apiUrl}/${venda_id}`,item_lista)
  }

  getNumeroVenda(){
    return this.http.get<any>('http://localhost:3000/config/numero')
  }

  concluiVenda(venda_id:any){
    return this.http.get<any>(`http://localhost:3000/concluir/${venda_id}`)
  }
}
