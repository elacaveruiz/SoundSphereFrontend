import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroArtistaComponent } from './genero-artista.component';

describe('GeneroArtistaComponent', () => {
  let component: GeneroArtistaComponent;
  let fixture: ComponentFixture<GeneroArtistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneroArtistaComponent]
    });
    fixture = TestBed.createComponent(GeneroArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
