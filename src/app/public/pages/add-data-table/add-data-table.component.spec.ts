import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataTableComponent } from './add-data-table.component';

describe('AddDataTableComponent', () => {
  let component: AddDataTableComponent;
  let fixture: ComponentFixture<AddDataTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDataTableComponent]
    });
    fixture = TestBed.createComponent(AddDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
