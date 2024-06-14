import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFuturoComponent } from './add-futuro.component';

describe('AddFuturoComponent', () => {
  let component: AddFuturoComponent;
  let fixture: ComponentFixture<AddFuturoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFuturoComponent]
    });
    fixture = TestBed.createComponent(AddFuturoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
