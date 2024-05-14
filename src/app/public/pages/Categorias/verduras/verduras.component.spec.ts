import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdurasComponent } from './verduras.component';

describe('VerdurasComponent', () => {
  let component: VerdurasComponent;
  let fixture: ComponentFixture<VerdurasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerdurasComponent]
    });
    fixture = TestBed.createComponent(VerdurasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
