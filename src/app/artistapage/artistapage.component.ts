import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SongService} from "../service/song.service";

@Component({
  selector: 'app-artistapage',
  templateUrl: './artistapage.component.html',
  styleUrls: ['./artistapage.component.css']
})
export class ArtistapageComponent implements OnInit{

  datosArtista: any;
  canciones: any[] = []
  albumes: any[] = []
  artistaId!: number;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private songService: SongService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.artistaId = params['id'];
      this.getArtistSongs(this.artistaId);
    })
  }

  getArtistSongs(artistaId: number): void{
    this.http.get<any>('http://localhost:8080/artist/songs/' + artistaId).subscribe(
      canciones => {
        console.log('Canciones del artista:', canciones);
        this.canciones = canciones;
      },
      error => {
        console.error('Error al obtener las canciones del artista:', error);
      }
    );
  }

  getArtistData(artistaId: number): void{
    this.http.get<any>('http://localhost:8080/artist/' + artistaId).subscribe(
      datos => {
        console.log('Datos del artista:', datos);
        this.datosArtista = datos;
      },
      error => {
        console.error('Error al obtener las canciones del artista:', error);
      }
    );
  }

  getArtistsAlbums(artistaId: number): void{
    this.http.get<any>('http://localhost:8080/artist/album/' + artistaId).subscribe(
      datos => {
        console.log('Datos del artista:', datos);
        this.datosArtista = datos;
      },
      error => {
        console.error('Error al obtener las canciones del artista:', error);
      }
    );
  }

}
