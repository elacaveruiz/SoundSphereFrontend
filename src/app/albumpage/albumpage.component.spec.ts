import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumpageComponent } from './albumpage.component';

describe('AlbumpageComponent', () => {
  let component: AlbumpageComponent;
  let fixture: ComponentFixture<AlbumpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumpageComponent]
    });
    fixture = TestBed.createComponent(AlbumpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
