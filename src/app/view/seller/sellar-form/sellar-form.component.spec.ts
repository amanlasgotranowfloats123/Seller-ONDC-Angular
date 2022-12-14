import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellarFormComponent } from './sellar-form.component';

describe('SellarFormComponent', () => {
  let component: SellarFormComponent;
  let fixture: ComponentFixture<SellarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellarFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
