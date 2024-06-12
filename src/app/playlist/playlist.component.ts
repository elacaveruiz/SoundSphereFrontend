import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SongService} from "../service/song.service";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit{

  lista: any;
  canciones: any[] = [];
  usuario: any;
  listaId!: number;
  showAddDropdown: boolean = false;
  showEditDropdown: boolean = false;
  selectedCancionId: number | null = null;
  playlists: any[] = [];
  newPlaylistTitle: string = '';
  userId: number = parseInt(localStorage.getItem('profile') || '0'); // ID del usuario actual
  listaEditada: any | null = null;

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
    this.route.params.subscribe(params => {
      this.listaId = params['id'];
      this.getPlaylistDetails(this.listaId);
      this.getPlaylistSongs(this.listaId);
      this.getUserData(this.userId);
      this.loadPlaylists();
    });
  }

  getPlaylistDetails(listaId: number): void{
    // Hacer la solicitud HTTP para obtener los detalles de la lista
    this.http.get<any>('http://localhost:8080/playlist/' + listaId).subscribe(
      lista => {
        console.log('Datos de la lista:', lista);
        this.lista = lista;
      },
      error => {
        console.error('Error al obtener los detalles:', error);
      }
    );
  }

  getPlaylistSongs(listaId: number): void {
    this.http.get<any>('http://localhost:8080/playlist/songs/' + listaId).subscribe(
      canciones => {
        console.log('Canciones:', canciones);
        this.canciones = canciones
      },
      error => {
        console.error('Error al obtener las canciones:', error);
      }
    );
  }

  getUserData(userId: number): void{
    this.http.get<any>('http://localhost:8080/user/' + userId).subscribe(
      userData => {
        console.log('Datos del usuario:', userData);
        this.usuario = userData;
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

  openAddPlaylistDropdown(cancionId: number) {
    this.selectedCancionId = cancionId;
    this.showAddDropdown = true;
  }

  closeAddPlaylistDropdown() {
    this.showAddDropdown = false;
    this.selectedCancionId = null;
  }

  openEditPlaylistDropdown() {
    this.showEditDropdown = true;
  }

  closeEditPlaylistDropdown() {
    this.showEditDropdown = false;
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
          this.closeAddPlaylistDropdown();
        },
        error => {
          console.error('Error al añadir la canción a la playlist:', error);
        }
      );
    }
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

  isOwner(): boolean {
    return this.lista.idUsuario === this.userId;
  }

  editPlaylist(): void {
    this.showEditDropdown = true;
  }

  updatePlaylist(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userId': this.userId.toString()
    });

    this.http.put<any>(`http://localhost:8080/playlist/edit/${this.listaId}`, this.lista, { headers }).subscribe(
      data => {
        this.showEditDropdown = false;
        this.lista = data;
      },
      error => {
        console.error('Error al actualizar la playlist:', error);
      }
    );
  }

  deletePlaylist(): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta playlist? Esta acción no se puede deshacer.')) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'userId': this.userId.toString()
      });

      this.http.delete(`http://localhost:8080/playlist/delete/${this.listaId}`, { headers }).subscribe(
        () => {
          console.log('Playlist eliminada');
          // Redirigir o actualizar la vista según sea necesario
          // Por ejemplo, podrías redirigir a la página de listas de reproducción del usuario
          window.location.href = '/inicio'; // Asegúrate de que esta ruta exista en tu aplicación
        },
        error => {
          console.error('Error al eliminar la playlist:', error);
        }
      );
    }
  }

  removeSongFromPlaylist(cancionId: number): void {
    this.http.delete(`http://localhost:8080/playlist/remove-song/${this.listaId}/${cancionId}`).subscribe(
      () => {
        console.log('Canción eliminada de la lista correctamente.');
        // Actualiza la lista de canciones o realiza otras acciones necesarias después de eliminar la canción.
      },
      error => {
        console.error('Error al eliminar la canción de la lista:', error);
      }
    );
  }
}
