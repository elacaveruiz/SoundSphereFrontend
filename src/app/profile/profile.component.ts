import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {SongService} from "../service/song.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  userData!: any;
  isFollowing: boolean = false;
  listas: any[] = [];
  userId: number = parseInt(localStorage.getItem('profile') || '0'); // ID del usuario actual
  profileId: number = 0; // ID del perfil que se visualiza
  isOwnProfile: boolean = false;
  artistasFav: any[] = [];
  canciones: any[] = [];
  listaEditada: any | null = null;
  newPlaylistTitle: string = '';
  newPlaylistImage: string = '';
  playlists: any[] = [];
  showAddDropdown: boolean = false;
  selectedCancionId: number | null = null;
  showEditDropdown: boolean = false;
  usuarioEditado: any | null = null;


  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private songService: SongService) {  }

  ngOnInit(): void {
    this.getUserData();
    this.getUserPlaylists();
    this.route.params.subscribe(params => {
      this.profileId = +params['id']; // Obtener el ID del perfil que estás viendo
      this.isOwnProfile = this.userId === this.profileId; // Comprobar si es el propio perfil
      if (!this.isOwnProfile) {
        this.checkIfFollowing();
      }
      this.getFavouriteArtists();
      this.getUserPlaylists();
    });
    this.loadLastSongs();
  }

  getUserData(): void{
    const idUser = this.route.snapshot.paramMap.get('id');
    const url = `http://localhost:8080/user/${idUser}`;
    console.log('Realizando petición a:', url); // Aquí se mostrará la URL de la solicitud
    this.http.get<any[]>(url).subscribe(
      userData => {
        this.userData = userData;
      },
      error => {
        console.error('Error al obtener los artistas favoritos:', error);
      }
    );
  }

  getUserPlaylists(): void{
    const idUser = this.profileId;
    const url = `http://localhost:8080/playlist/user/${idUser}`;
    console.log('Realizando petición a:', url); // Aquí se mostrará la URL de la solicitud
    this.http.get<any[]>(url).subscribe(
      listas => {
        this.listas = listas;
      },
      error => {
        console.error('Error al obtener los artistas favoritos:', error);
      }
    );
  }

  checkIfFollowing(): void {
    this.http.get<boolean>(`http://localhost:8080/follow/check/${this.userId}/${this.profileId}`).subscribe(
      response => {
        this.isFollowing = response;
      },
      error => {
        console.error('Error al comprobar el estado de seguimiento:', error);
      }
    );
  }

  toggleFollow(): void {
    const followData = {
      seguidorId: this.userId,
      seguidoId: this.profileId
    };

    this.http.post('http://localhost:8080/follow/toggle', followData).subscribe(
      response => {
        this.isFollowing = !this.isFollowing;
      },
      error => {
        console.error('Error al cambiar el estado de seguimiento:', error);
      }
    );
  }

  getFavouriteArtists(): void{
    const idLogin = this.profileId;
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

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth']);
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

  sendSong(song: any): void {
    const dataToSend = {
      selectedSong: song,
      playlist: this.canciones
    };
    this.songService.sendSong(dataToSend);
  }

  openAddPlaylistDropdown(cancionId: number) {
    this.selectedCancionId = cancionId;
    this.showAddDropdown = true;
  }

  closeAddPlaylistDropdown() {
    this.showAddDropdown = false;
    this.selectedCancionId = null;
  }

  loadLastSongs() {
    this.http.get<any[]>(`http://localhost:8080/reproduction/last/${this.profileId}`).subscribe(
      canciones => {
        this.canciones = canciones;
      },
      error => {
        console.error('Error al cargar las últimas canciones reproducidas:', error);
      }
    );
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

  openEditUserDropdown() {
    this.showEditDropdown = true;
  }

  closeEditUserDropdown() {
    this.showEditDropdown = false;
  }

  updateUser(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userId': this.userId.toString()
    });

    this.http.put<any>(`http://localhost:8080/user/edit/${this.userId}`, this.userData, { headers }).subscribe(
      data => {
        this.showEditDropdown = false;
        this.userData = data;
      },
      error => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
}
