import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoExecutadoListComponent } from './servico-executado-list.component';

describe('ServicoExecutadoListComponent', () => {
  let component: ServicoExecutadoListComponent;
  let fixture: ComponentFixture<ServicoExecutadoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicoExecutadoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicoExecutadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
