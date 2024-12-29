import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoItemComponent } from './orcamento-item.component';

describe('OrcamentoItemComponent', () => {
  let component: OrcamentoItemComponent;
  let fixture: ComponentFixture<OrcamentoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcamentoItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrcamentoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
