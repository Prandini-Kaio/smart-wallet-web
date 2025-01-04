import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorErrosItemComponent } from './monitor-erros-item.component';

describe('MonitorErrosItemComponent', () => {
  let component: MonitorErrosItemComponent;
  let fixture: ComponentFixture<MonitorErrosItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorErrosItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorErrosItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
