import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private apiUrl = 'http://localhost:3000/produtos'

  constructor(private http: HttpClient) { }

  getAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl)
  }

  getOne(id:any){
    // console.log(id)
    // console.log(this.http.get<Produto>(this.apiUrl,id))
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

  saveProduto(produto:any){
    return this.http.post(this.apiUrl,produto)
  }

  putProduto(id:any, produto:any){
    return this.http.put<any>(`${this.apiUrl}/${id}`,produto)
  }

  deleteProduto(id:any){
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }
}
