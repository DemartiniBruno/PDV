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
}
