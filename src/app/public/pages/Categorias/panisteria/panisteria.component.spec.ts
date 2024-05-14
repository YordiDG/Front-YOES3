import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanisteriaComponent } from './panisteria.component';

describe('PanisteriaComponent', () => {
  let component: PanisteriaComponent;
  let fixture: ComponentFixture<PanisteriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanisteriaComponent]
    });
    fixture = TestBed.createComponent(PanisteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
