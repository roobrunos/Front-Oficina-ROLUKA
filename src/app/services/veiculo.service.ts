import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Veiculo {
  id?: number;
  modelo: string;
  placa: string;
  ano: number;
}

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private API = 'http://localhost:8080/veiculos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.API);
  }

  buscarPorId(id: number): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.API}/${id}`);
  }

  criar(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.API, veiculo);
  }

  atualizar(id: number, veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.API}/${id}`, veiculo);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}

