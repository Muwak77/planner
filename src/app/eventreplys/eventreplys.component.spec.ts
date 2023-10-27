import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventreplysComponent } from './eventreplys.component';

describe('EventreplysComponent', () => {
  let component: EventreplysComponent;
  let fixture: ComponentFixture<EventreplysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventreplysComponent]
    });
    fixture = TestBed.createComponent(EventreplysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
