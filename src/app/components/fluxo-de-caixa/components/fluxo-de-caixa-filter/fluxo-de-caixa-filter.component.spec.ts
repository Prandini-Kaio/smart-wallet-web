import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoDeCaixaFilterComponent } from './fluxo-de-caixa-filter.component';

describe('FluxoDeCaixaFilterComponent', () => {
  let component: FluxoDeCaixaFilterComponent;
  let fixture: ComponentFixture<FluxoDeCaixaFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluxoDeCaixaFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluxoDeCaixaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
