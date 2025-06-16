import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { OrdemServicoService, OrdemServico } from '../../services/ordem-servico.service';
import { ClienteService, Cliente } from '../../services/cliente.service';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-ordem-servico-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    DropdownModule,
    ButtonModule
  ],
  templateUrl: './ordem-servico-form.component.html',
  styleUrls: ['./ordem-servico-form.component.css']
})
export class OrdemServicoFormComponent implements OnInit {
  ordemForm!: FormGroup;
  statusOptions = [
    { label: 'ABERTA', value: 'ABERTA' },
    { label: 'EM ANDAMENTO', value: 'EM_ANDAMENTO' },
    { label: 'CONCLUÍDA', value: 'CONCLUIDA' }
  ];

  ordemId?: number;
  cpfBusca = '';
  clienteSelecionado: Cliente | null = null;
  veiculosCliente = [] as Cliente['veiculos'];


  constructor(
    private fb: FormBuilder,
    private ordemService: OrdemServicoService,
    private clienteService: ClienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.criarFormulario();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ordemId = +id;
      this.ordemService.buscarPorId(this.ordemId).subscribe(ordem => {
        this.ordemForm.patchValue(ordem);
      });
    }
  }

  criarFormulario(): void {
    this.ordemForm = this.fb.group({
      status: ['', Validators.required],
      cliente: this.fb.group({
        id: [null, Validators.required]
      }),
      veiculo: this.fb.group({
        id: [null, Validators.required]
      })
    });
  }

  buscarClientePorCpf(): void {
    if (!this.cpfBusca) return;

    this.clienteService.buscarPorCpf(this.cpfBusca).subscribe({
      next: cliente => {
        this.clienteSelecionado = cliente;

        // 🧠 Use patchValue com objeto aninhado
        this.ordemForm.patchValue({
          cliente: { id: cliente.id }
        });

        this.veiculosCliente = cliente.veiculos || [];
      },
      error: () => {
        this.clienteSelecionado = null;
        this.veiculosCliente = [];
        alert('Cliente não encontrado pelo CPF');
      }
    });
  }

  salvar(): void {
    if (this.ordemForm.valid) {
      const novaOrdem: OrdemServico = this.ordemForm.value;

      this.ordemService.criar(novaOrdem).subscribe({
        next: () => {
          alert('Ordem de Serviço salva com sucesso!');
          this.ordemForm.reset();
          this.clienteSelecionado = null;
          this.veiculosCliente = [];
          this.cpfBusca = '';
        },
        error: (err) => {
          console.error('Erro ao salvar ordem:', err);
          alert('Erro ao salvar ordem. Verifique os dados.');
        }
      });
    } else {
      console.warn('Formulário inválido:', this.ordemForm.value);
    }
  }
}


