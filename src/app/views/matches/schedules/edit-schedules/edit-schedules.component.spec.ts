import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchedulesComponent } from './edit-schedules.component';

describe('EditSchedulesComponent', () => {
  let component: EditSchedulesComponent;
  let fixture: ComponentFixture<EditSchedulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSchedulesComponent]
    });
    fixture = TestBed.createComponent(EditSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
