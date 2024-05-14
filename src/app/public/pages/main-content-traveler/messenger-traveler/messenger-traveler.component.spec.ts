import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerTravelerComponent } from './messenger-traveler.component';

describe('MessengerTravelerComponent', () => {
  let component: MessengerTravelerComponent;
  let fixture: ComponentFixture<MessengerTravelerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessengerTravelerComponent]
    });
    fixture = TestBed.createComponent(MessengerTravelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
