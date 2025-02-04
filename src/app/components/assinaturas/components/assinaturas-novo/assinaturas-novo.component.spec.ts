import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssinaturasNovoComponent } from './assinaturas-novo.component';

describe('AssinaturasNovoComponent', () => {
  let component: AssinaturasNovoComponent;
  let fixture: ComponentFixture<AssinaturasNovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssinaturasNovoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssinaturasNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
