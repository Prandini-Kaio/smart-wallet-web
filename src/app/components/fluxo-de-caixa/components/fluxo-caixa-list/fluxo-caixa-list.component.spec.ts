import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoCaixaListComponent } from './fluxo-caixa-list.component';

describe('FluxoCaixaListComponent', () => {
  let component: FluxoCaixaListComponent;
  let fixture: ComponentFixture<FluxoCaixaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluxoCaixaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluxoCaixaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
