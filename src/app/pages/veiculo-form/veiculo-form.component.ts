import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Veiculo, VeiculoService } from '../../services/veiculo.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-veiculo-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './veiculo-form.component.html',
  styleUrls: ['./veiculo-form.component.css']
})
export class VeiculoFormComponent implements OnInit {
  veiculoForm!: FormGroup;
  veiculoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.criarFormulario();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.veiculoId = +id;
      this.veiculoService.buscarPorId(this.veiculoId).subscribe(veiculo => {
        this.veiculoForm.patchValue(veiculo);
      });
    }
  }

  criarFormulario(): void {
    this.veiculoForm = this.fb.group({
      modelo: ['', Validators.required],
      placa: ['', Validators.required],
      ano: ['', [Validators.required, Validators.min(1900)]]
    });
  }

  salvar(): void {
    if (this.veiculoForm.valid) {
      const novoVeiculo: Veiculo = this.veiculoForm.value;

      if (this.veiculoId) {
        this.veiculoService.atualizar(this.veiculoId, novoVeiculo).subscribe(() => {
          alert('Veículo atualizado com sucesso!');
          this.router.navigate(['/veiculo-list']);
        });
      } else {
        this.veiculoService.criar(novoVeiculo).subscribe(() => {
          alert('Veículo criado com sucesso!');
          this.router.navigate(['/veiculo-list']);
        });
      }
    }
  }
}

