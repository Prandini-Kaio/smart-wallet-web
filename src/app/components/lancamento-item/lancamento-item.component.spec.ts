import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoItemComponent } from './lancamento-item.component';

describe('LancamentoItemComponent', () => {
  let component: LancamentoItemComponent;
  let fixture: ComponentFixture<LancamentoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LancamentoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
