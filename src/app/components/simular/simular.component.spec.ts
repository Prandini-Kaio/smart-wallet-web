import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimularComponent } from './simular.component';

describe('SimularComponent', () => {
  let component: SimularComponent;
  let fixture: ComponentFixture<SimularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
