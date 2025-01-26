import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssinaturasListComponent } from './assinaturas-list.component';

describe('AssinaturasListComponent', () => {
  let component: AssinaturasListComponent;
  let fixture: ComponentFixture<AssinaturasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssinaturasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssinaturasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
