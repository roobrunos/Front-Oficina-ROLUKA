import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Cliente, ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clienteService.listar().subscribe({
      next: data => this.clientes = data,
      error: err => console.error('Erro ao carregar clientes', err)
    });
  }

  novoCliente(): void {
    this.router.navigate(['/cliente-form']);
  }

  editarCliente(id: number): void {
    this.router.navigate(['/cliente-form', id]);
  }

  excluirCliente(id: number): void {
    if (confirm('Confirma a exclusão?')) {
      this.clienteService.excluir(id).subscribe(() => {
        this.clientes = this.clientes.filter(c => c.id !== id);
      });
    }
  }
}

