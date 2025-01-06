import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoFinanceiroTotalizadorComponent } from './resumo-financeiro-totalizador.component';

describe('ResumoFinanceiroTotalizadorComponent', () => {
  let component: ResumoFinanceiroTotalizadorComponent;
  let fixture: ComponentFixture<ResumoFinanceiroTotalizadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoFinanceiroTotalizadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoFinanceiroTotalizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
