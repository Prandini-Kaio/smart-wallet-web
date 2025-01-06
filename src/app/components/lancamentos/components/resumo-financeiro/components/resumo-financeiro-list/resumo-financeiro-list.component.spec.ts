import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoFinanceiroListComponent } from './resumo-financeiro-list.component';

describe('ResumoFinanceiroListComponent', () => {
  let component: ResumoFinanceiroListComponent;
  let fixture: ComponentFixture<ResumoFinanceiroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoFinanceiroListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoFinanceiroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
