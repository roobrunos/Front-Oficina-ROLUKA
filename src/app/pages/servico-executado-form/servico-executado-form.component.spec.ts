import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoExecutadoFormComponent } from './servico-executado-form.component';

describe('ServicoExecutadoFormComponent', () => {
  let component: ServicoExecutadoFormComponent;
  let fixture: ComponentFixture<ServicoExecutadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicoExecutadoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicoExecutadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
