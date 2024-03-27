import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancionArtistaComponent } from './cancion-artista.component';

describe('CancionArtistaComponent', () => {
  let component: CancionArtistaComponent;
  let fixture: ComponentFixture<CancionArtistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancionArtistaComponent]
    });
    fixture = TestBed.createComponent(CancionArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
