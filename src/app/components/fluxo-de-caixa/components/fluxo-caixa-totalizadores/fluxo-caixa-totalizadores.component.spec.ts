import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoCaixaTotalizadoresComponent } from './fluxo-caixa-totalizadores.component';

describe('FluxoCaixaTotalizadoresComponent', () => {
  let component: FluxoCaixaTotalizadoresComponent;
  let fixture: ComponentFixture<FluxoCaixaTotalizadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluxoCaixaTotalizadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluxoCaixaTotalizadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
