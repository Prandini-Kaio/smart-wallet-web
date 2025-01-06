import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoCaixaItemComponent } from './fluxo-caixa-item.component';

describe('FluxoCaixaItemComponent', () => {
  let component: FluxoCaixaItemComponent;
  let fixture: ComponentFixture<FluxoCaixaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluxoCaixaItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluxoCaixaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
