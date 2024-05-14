import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTravelerComponent } from './profile-traveler.component';

describe('ProfileTravelerComponent', () => {
  let component: ProfileTravelerComponent;
  let fixture: ComponentFixture<ProfileTravelerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileTravelerComponent]
    });
    fixture = TestBed.createComponent(ProfileTravelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
