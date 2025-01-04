import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacaoFilterComponent } from './transacao-filter.component';

describe('TransacaoFilterComponent', () => {
  let component: TransacaoFilterComponent;
  let fixture: ComponentFixture<TransacaoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransacaoFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransacaoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
