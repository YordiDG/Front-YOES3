import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeeperComponent } from './keeper.component';


describe('KeeperComponent', () => {
  let component: KeeperComponent;
  let fixture: ComponentFixture<KeeperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeeperComponent]
    });
    fixture = TestBed.createComponent(KeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
