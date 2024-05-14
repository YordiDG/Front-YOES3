import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindKeeperComponent } from './find-keeper.component';

describe('FindKeeperComponent', () => {
  let component: FindKeeperComponent;
  let fixture: ComponentFixture<FindKeeperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindKeeperComponent]
    });
    fixture = TestBed.createComponent(FindKeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
