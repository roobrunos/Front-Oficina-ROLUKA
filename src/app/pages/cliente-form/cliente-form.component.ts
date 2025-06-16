import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Cliente, ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    InputMaskModule
  ],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  clienteForm!: FormGroup;
  clienteId: number | null = null;
  tipoSelecionado: 'FISICA' | 'JURIDICA' | null = null;

  tiposPessoa = [
    { label: 'Pessoa Física', value: 'FISICA' },
    { label: 'Pessoa Jurídica', value: 'JURIDICA' }
  ];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.criarFormulario();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clienteId = +id;
      this.clienteService.buscarPorId(this.clienteId).subscribe(cliente => {
        this.clienteForm.patchValue(cliente);
        console.log('Cliente carregado:', cliente); 
        this.tipoSelecionado = cliente?.tipoPessoa as 'FISICA' | 'JURIDICA' || null;
      });
    }
  }

  criarFormulario() {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      documento: ['', Validators.required],
      tipoPessoa: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  aoSelecionarTipoPessoa() {
    this.tipoSelecionado = this.clienteForm.get('tipoPessoa')?.value;
    this.clienteForm.get('documento')?.reset();
  }

  salvar() {
    if (this.clienteForm.valid) {
      const cliente: Cliente = this.clienteForm.value;
  
      
      cliente.documento = cliente.documento?.replace(/\D/g, '') || '';
  
      if (this.clienteId) {
        this.clienteService.atualizar(this.clienteId, cliente).subscribe({
          next: () => {
            alert('Cliente atualizado com sucesso!');
            this.router.navigate(['/cliente-list']);
          },
          error: err => console.error('Erro ao atualizar', err)
        });
      } else {
        this.clienteService.criar(cliente).subscribe({
          next: () => {
            alert('Cliente criado com sucesso!');
            this.router.navigate(['/cliente-list']);
          },
          error: err => console.error('Erro ao criar cliente', err)
        });
      }
    }
  }
  
}
