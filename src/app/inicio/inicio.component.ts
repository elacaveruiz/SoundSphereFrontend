import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  novedades: any[] = [];

  artistasFav: any[] = [];
  showAll: boolean = false;

  constructor(private http: HttpClient) {  }

  ngOnInit(): void {
    this.getFavouriteArtists();
    this.getLatestAlbums();
  }

  getLatestAlbums(): void {
    this.http.get<any[]>('http://localhost:8080/album/latest').subscribe(
      novedades => {
        this.novedades = novedades;
      },
      error => {
        console.error('Error al obtener los últimos álbumes:', error);
      }
    );
  }

  getFavouriteArtists(): void{
    const idLogin = localStorage.getItem('user');
    const url = `http://localhost:8080/artista/fav/${idLogin}`;
    console.log('Realizando petición a:', url); // Aquí se mostrará la URL de la solicitud
    this.http.get<any[]>(url).subscribe(
      artistasfav => {
        this.artistasFav = artistasfav;
      },
      error => {
        console.error('Error al obtener los artistas favoritos:', error);
      }
    );
  }

}
//<>
