import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumArtistaComponent } from './album-artista.component';

describe('AlbumArtistaComponent', () => {
  let component: AlbumArtistaComponent;
  let fixture: ComponentFixture<AlbumArtistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumArtistaComponent]
    });
    fixture = TestBed.createComponent(AlbumArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
