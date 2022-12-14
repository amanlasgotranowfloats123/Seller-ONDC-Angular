import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenotiComponent } from './createnoti.component';

describe('CreatenotiComponent', () => {
  let component: CreatenotiComponent;
  let fixture: ComponentFixture<CreatenotiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatenotiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
