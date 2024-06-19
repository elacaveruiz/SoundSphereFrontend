import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {SongService} from "../service/song.service";

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
showDropdown: boolean = false;
selectedCancionId: number | null = null;
playlists: any[] = [];
newPlaylistTitle: string = '';
  newPlaylistImage: string = '';

  sendSong(song: any): void {
    const dataToSend = {
      selectedSong: song,
      playlist: this.canciones
    };
    this.songService.sendSong(dataToSend);
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
      this.loadPlaylists();
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
  getAlbumSongs(albumId: number): void {
    this.http.get<any>('http://localhost:8080/cancion/album/' + albumId).subscribe(
      canciones => {
        console.log('Canciones del álbum sin ordenar:', canciones);
        // Ordenar las canciones por su id en orden ascendente
        this.canciones = canciones.sort((a: any, b: any) => a.id - b.id);
        console.log('Canciones del álbum ordenadas:', this.canciones);
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

  openPlaylistDropdown(cancionId: number) {
    this.selectedCancionId = cancionId;
    this.showDropdown = true;
  }

  closePlaylistDropdown() {
    this.showDropdown = false;
    this.selectedCancionId = null;
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
          this.closePlaylistDropdown();
        },
        error => {
          console.error('Error al añadir la canción a la playlist:', error);
        }
      );
    }
  }


  createAndAddToNewPlaylist() {
    if (this.selectedCancionId !== null && this.newPlaylistTitle.trim() && this.newPlaylistImage.trim()) {
      const newPlaylist = {
        titulo: this.newPlaylistTitle,
        urlImagen: this.newPlaylistImage,
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
              this.closePlaylistDropdown();
              this.loadPlaylists();
            },
            error => {
              console.error('Error al añadir la canción a la nueva playlist:', error);
            }
          );
        },
        error => {
          console.error('Error al crear la nueva playlist:', error);
        }
      );
    }
  }
}
