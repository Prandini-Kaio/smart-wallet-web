import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoFinanceiroFilterComponent } from './resumo-financeiro-filter.component';

describe('ResumoFinanceiroFilterComponent', () => {
  let component: ResumoFinanceiroFilterComponent;
  let fixture: ComponentFixture<ResumoFinanceiroFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoFinanceiroFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoFinanceiroFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
