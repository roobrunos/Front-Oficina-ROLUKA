import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Veiculo {
  id: number;
  placa: string;
}

export interface Cliente {
  tipoPessoa: string | null;
  id: number;
  nome: string;
  email?: string; 
  telefone: string;
  documento: string; 
  veiculos?: Veiculo[];
}


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private API = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }

  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API}/${id}`);
  }

  buscarPorCpf(cpf: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API}/cpf/${cpf}`);
  }

  criar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, cliente);
  }

  atualizar(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.API}/${id}`, cliente);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
