import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerKeeperComponent } from './messenger-keeper.component';

describe('MessengerKeeperComponent', () => {
  let component: MessengerKeeperComponent;
  let fixture: ComponentFixture<MessengerKeeperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessengerKeeperComponent]
    });
    fixture = TestBed.createComponent(MessengerKeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
