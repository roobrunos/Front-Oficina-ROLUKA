import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { VeiculoService, Veiculo } from '../../services/veiculo.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-veiculo-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css']
})
export class VeiculoListComponent implements OnInit {
  veiculos: Veiculo[] = [];

  constructor(
    private veiculoService: VeiculoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.veiculoService.listar().subscribe({
      next: (data) => this.veiculos = data,
      error: (err) => console.error('Erro ao carregar veículos', err)
    });
  }

  novoVeiculo(): void {
    this.router.navigate(['/veiculo-form']);
  }

  editarVeiculo(id: number): void {
    this.router.navigate(['/veiculo-form', id]);
  }

  excluirVeiculo(id: number): void {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      this.veiculoService.excluir(id).subscribe({
        next: () => {
          this.veiculos = this.veiculos.filter(v => v.id !== id);
          alert('Veículo excluído com sucesso!');
        },
        error: (err) => console.error('Erro ao excluir veículo', err)
      });
    }
  }
}

