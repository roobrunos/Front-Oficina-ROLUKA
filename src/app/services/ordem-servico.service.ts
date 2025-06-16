import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrdemServico {
  id: number;
  codigo: string;
  status: string;
  cliente: string;
  veiculo: string;
  
}

@Injectable({
  providedIn: 'root' 
})
export class OrdemServicoService {
  private API = 'http://localhost:8080/ordens';

  constructor(private http: HttpClient) {}

  listar(): Observable<OrdemServico[]> {
    return this.http.get<OrdemServico[]>(this.API);
  }

  buscarPorId(id: number): Observable<OrdemServico> {
    return this.http.get<OrdemServico>(`${this.API}/${id}`);
  }

  criar(ordem: OrdemServico): Observable<OrdemServico> {
    return this.http.post<OrdemServico>(this.API, ordem);
  }

  
  atualizar(id: number, ordem: OrdemServico): Observable<OrdemServico> {
    return this.http.put<OrdemServico>(`${this.API}/${id}`, ordem);
  }
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
  
  
}


