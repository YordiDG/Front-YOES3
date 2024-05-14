import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LacteosComponent } from './lacteos.component';

describe('LacteosComponent', () => {
  let component: LacteosComponent;
  let fixture: ComponentFixture<LacteosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LacteosComponent]
    });
    fixture = TestBed.createComponent(LacteosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
