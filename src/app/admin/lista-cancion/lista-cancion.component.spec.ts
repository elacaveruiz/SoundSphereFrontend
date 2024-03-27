import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCancionComponent } from './lista-cancion.component';

describe('ListaCancionComponent', () => {
  let component: ListaCancionComponent;
  let fixture: ComponentFixture<ListaCancionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaCancionComponent]
    });
    fixture = TestBed.createComponent(ListaCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
