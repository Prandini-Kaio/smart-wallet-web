import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorErrosComponent } from './monitor-erros.component';

describe('MonitorErrosComponent', () => {
  let component: MonitorErrosComponent;
  let fixture: ComponentFixture<MonitorErrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorErrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonitorErrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
