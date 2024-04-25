import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {SongService} from "../service/song.service";
import {Song} from "../service/interface";

@Component({
  selector: 'app-albumpage',
  templateUrl: './albumpage.component.html',
  styleUrls: ['./albumpage.component.css']
})
export class AlbumpageComponent implements OnInit{

albumData: any;
canciones: any[] = [];
artistas: any[] = [];
albumId!: number;

  sendSong(song: any): void{
    this.songService.sendSong(song);
  }

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private songService: SongService) { }

  ngOnInit(): void {
    // Obtener el ID del álbum de la ruta
    this.route.params.subscribe(params => {
      this.albumId = params['id'];
      // Llamar a la función para obtener los detalles del álbum
      this.getAlbumDetails(this.albumId);
      this.getAlbumSongs(this.albumId);
      this.getAlbumArtists(this.albumId);
    });
  }

  getAlbumDetails(albumId: number): void {
    // Hacer la solicitud HTTP para obtener los detalles del álbum
    this.http.get<any>('http://localhost:8080/album/' + albumId).subscribe(
      album => {
        console.log('Datos del álbum:', album);
        this.albumData = album;
      },
      error => {
        console.error('Error al obtener los detalles del álbum:', error);
      }
    );
  }
  getAlbumSongs(albumId: number): void{
    this.http.get<any>('http://localhost:8080/cancion/album/' + albumId).subscribe(
      canciones => {
        console.log('Canciones del álbum:', canciones);
        this.canciones = canciones;
      },
      error => {
        console.error('Error al obtener las canciones del álbum:', error);
      }
    );
  }

  getAlbumArtists(albumId: number): void{
    this.http.get<any>('http://localhost:8080/album/getartists/' + albumId).subscribe(
      artistas => {
        console.log('Artistas del álbum:', artistas);
        this.artistas = artistas;
      },
      error => {
        console.error('Error al obtener los artistas del álbum:', error);
      }
    );
  }

  convertirSegundosAMinutos(segundos: number): string {
    const minutos = Math.floor(segundos / 60); // Obtener los minutos enteros
    const segundosRestantes = segundos % 60; // Obtener los segundos restantes

    // Formatear los minutos y segundos con ceros a la izquierda si es necesario
    const minutosFormateados = minutos < 10 ? '0' + minutos : minutos.toString();
    const segundosFormateados = segundosRestantes < 10 ? '0' + segundosRestantes : segundosRestantes.toString();

    // Devolver el resultado en formato "mm:ss"
    return minutosFormateados + ':' + segundosFormateados;
  }
}
