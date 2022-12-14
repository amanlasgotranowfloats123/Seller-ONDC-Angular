import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersinnerComponent } from './ordersinner.component';

describe('OrdersinnerComponent', () => {
  let component: OrdersinnerComponent;
  let fixture: ComponentFixture<OrdersinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
