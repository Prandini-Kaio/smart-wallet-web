import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoFinanceiroItemComponent } from './resumo-financeiro-item.component';

describe('ResumoFinanceiroItemComponent', () => {
  let component: ResumoFinanceiroItemComponent;
  let fixture: ComponentFixture<ResumoFinanceiroItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoFinanceiroItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoFinanceiroItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
