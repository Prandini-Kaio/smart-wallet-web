import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoChartComponent } from './orcamento-chart.component';

describe('OrcamentoChartComponent', () => {
  let component: OrcamentoChartComponent;
  let fixture: ComponentFixture<OrcamentoChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcamentoChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrcamentoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
