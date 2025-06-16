import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { OrdemServico, OrdemServicoService } from '../../services/ordem-servico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordem-servico-list',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './ordem-servico-list.component.html',
  styleUrls: ['./ordem-servico-list.component.css']
})
export class OrdemServicoListComponent implements OnInit {
  ordens: OrdemServico[] = [];

  constructor(
    private ordemService: OrdemServicoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarOrdens();
  }

  carregarOrdens(): void {
    this.ordemService.listar().subscribe({
      next: (data: OrdemServico[]) => this.ordens = data,
      error: (err: any) => console.error('Erro ao carregar ordens', err)
    });
  }

  editarOrdem(id: number): void {
    this.router.navigate(['/ordem-servico-form', id]);
  }

  novaOrdem(): void {
    this.router.navigate(['/ordem-servico-form']);
  }

  excluirOrdem(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta ordem de serviço?')) {
      this.ordemService.excluir(id).subscribe({
        next: () => {
          this.ordens = this.ordens.filter(ordem => ordem.id !== id);
          alert('Ordem de serviço excluída com sucesso!');
        },
        error: (err: any) => console.error('Erro ao excluir ordem', err)
      });
    }
  }
}




