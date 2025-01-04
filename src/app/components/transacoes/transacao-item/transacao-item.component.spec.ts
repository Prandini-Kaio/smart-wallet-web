import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacaoItemComponent } from './transacao-item.component';

describe('TransacaoItemComponent', () => {
  let component: TransacaoItemComponent;
  let fixture: ComponentFixture<TransacaoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransacaoItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransacaoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
