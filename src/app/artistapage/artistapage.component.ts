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

  artista: any;
  canciones: any[] = []
  albumes: any[] = []
  artistaId!: number;
  showAddDropdown: boolean = false;
  playlists: any[] = [];
  selectedCancionId: number | null = null;
  newPlaylistTitle: string = '';
  userId: number = parseInt(localStorage.getItem('profile') || '0'); // ID del usuario actual
  listaEditada: any | null = null;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private songService: SongService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.artistaId = params['id'];
      this.getArtistSongs(this.artistaId);
      this.getArtistData(this.artistaId);
      this.getArtistsAlbums(this.artistaId);
      this.loadPlaylists()
    })
  }

  sendSong(song: any): void {
    const dataToSend = {
      selectedSong: song,
      playlist: this.canciones
    };
    this.songService.sendSong(dataToSend);
  }

  getArtistSongs(artistaId: number): void{
    this.http.get<any>('http://localhost:8080/cancion/artista/' + artistaId).subscribe(
      canciones => {
        console.log('Canciones del artista:', canciones);
        this.canciones = canciones;
        this.canciones = canciones.sort((a: any, b: any) => b.reproducciones - a.reproducciones);
      },
      error => {
        console.error('Error al obtener las canciones del artista:', error);
      }
    );
  }

  getArtistData(artistaId: number): void{
    this.http.get<any>('http://localhost:8080/artista/' + artistaId).subscribe(
      datos => {
        console.log('Datos del artista:', datos);
        this.artista = datos;
      },
      error => {
        console.error('Error al obtener los datos del artista:', error);
      }
    );
  }

  getArtistsAlbums(artistaId: number): void{
    this.http.get<any>('http://localhost:8080/artista/album/' + artistaId).subscribe(
      datos => {
        console.log('Discografía del artista:', datos);
        this.albumes = datos;
      },
      error => {
        console.error('Error al obtener la discografía del artista:', error);
      }
    );
  }

  createAndAddToNewPlaylist() {
    if (this.selectedCancionId !== null && this.newPlaylistTitle.trim()) {
      const newPlaylist = {
        titulo: this.newPlaylistTitle,
        idUsuario: localStorage.getItem('profile')
      };
      this.http.post('http://localhost:8080/playlist/create', newPlaylist).subscribe(
        (response: any) => {
          console.log('Nueva playlist creada:', response);
          const data = {
            idLista: response.id,
            idCancion: this.selectedCancionId
          };
          this.http.post('http://localhost:8080/playlist/add', data).subscribe(
            addResponse => {
              console.log('Canción añadida a la nueva playlist:', addResponse);
              this.closeAddPlaylistDropdown();
              this.loadPlaylists();
            },
            error => {
              if (error.status === 400 && error.error === 'La canción ya está en la playlist') {
                alert('La canción ya está en la playlist');
              } else {
                console.error('Error al añadir la canción a la nueva playlist:', error);
              }
            }
          );
        },
        error => {
          console.error('Error al crear la nueva playlist:', error);
        }
      );
    }
  }

  onPlaylistSelected(event: any) {
    const selectedPlaylistId = event.target.value;
    if (selectedPlaylistId && this.selectedCancionId !== null) {
      const data = {
        idLista: selectedPlaylistId,
        idCancion: this.selectedCancionId
      };
      this.http.post('http://localhost:8080/playlist/add', data).subscribe(
        response => {
          console.log('Canción añadida a la playlist:', response);
          this.closeAddPlaylistDropdown();
        },
        error => {
          console.error('Error al añadir la canción a la playlist:', error);
        }
      );
    }
  }

  loadPlaylists() {
    const userId = localStorage.getItem('profile');
    this.http.get<any[]>(`http://localhost:8080/playlist/user/${userId}`).subscribe(
      playlists => {
        this.playlists = playlists;
      },
      error => {
        console.error('Error al cargar las playlists:', error);
      }
    );
  }

  openAddPlaylistDropdown(cancionId: number) {
    this.selectedCancionId = cancionId;
    this.showAddDropdown = true;
  }

  closeAddPlaylistDropdown() {
    this.showAddDropdown = false;
    this.selectedCancionId = null;
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
