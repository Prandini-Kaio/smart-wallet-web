import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoFilterComponent } from './lancamento-filter.component';

describe('LancamentoFilterComponent', () => {
  let component: LancamentoFilterComponent;
  let fixture: ComponentFixture<LancamentoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LancamentoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
