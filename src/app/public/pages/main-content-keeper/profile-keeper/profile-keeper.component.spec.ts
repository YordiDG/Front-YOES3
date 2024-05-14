import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileKeeperComponent } from './profile-keeper.component';

describe('ProfileKeeperComponent', () => {
  let component: ProfileKeeperComponent;
  let fixture: ComponentFixture<ProfileKeeperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileKeeperComponent]
    });
    fixture = TestBed.createComponent(ProfileKeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
