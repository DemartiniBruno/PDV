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
}
