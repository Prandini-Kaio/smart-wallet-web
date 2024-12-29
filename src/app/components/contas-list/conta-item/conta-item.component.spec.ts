import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaItemComponent } from './conta-item.component';

describe('ContaItemComponent', () => {
  let component: ContaItemComponent;
  let fixture: ComponentFixture<ContaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContaItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
