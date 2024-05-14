import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbarrotesComponent } from './abarrotes.component';

describe('AbarrotesComponent', () => {
  let component: AbarrotesComponent;
  let fixture: ComponentFixture<AbarrotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbarrotesComponent]
    });
    fixture = TestBed.createComponent(AbarrotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
