import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoDetailsComponent } from './lancamento-details.component';

describe('LancamentoDetailsComponent', () => {
  let component: LancamentoDetailsComponent;
  let fixture: ComponentFixture<LancamentoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LancamentoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
