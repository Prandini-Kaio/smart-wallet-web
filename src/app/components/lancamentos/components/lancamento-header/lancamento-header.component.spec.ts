import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoHeaderComponent } from './lancamento-header.component';

describe('LancamentoHeaderComponent', () => {
  let component: LancamentoHeaderComponent;
  let fixture: ComponentFixture<LancamentoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LancamentoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
