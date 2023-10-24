import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditevententryComponent } from './editevententry.component';

describe('EditevententryComponent', () => {
  let component: EditevententryComponent;
  let fixture: ComponentFixture<EditevententryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditevententryComponent]
    });
    fixture = TestBed.createComponent(EditevententryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
