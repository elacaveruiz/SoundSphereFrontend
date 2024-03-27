import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroCancionComponent } from './genero-cancion.component';

describe('GeneroCancionComponent', () => {
  let component: GeneroCancionComponent;
  let fixture: ComponentFixture<GeneroCancionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneroCancionComponent]
    });
    fixture = TestBed.createComponent(GeneroCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
