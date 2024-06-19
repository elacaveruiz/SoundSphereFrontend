import {Component, OnInit} from '@angular/core';
import { SearchService } from '../service/search.service';
import {SongService} from "../service/song.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  query: string = '';
  searchResults: any;
  canciones: any[] = [];
  showAll: boolean = false;
  showAllArtists: boolean = false;
  showAllProfiles: boolean = false;
  selectedCancionId: number | null = null;
  showAddDropdown: boolean = false;
  playlists: any[] = [];
  newPlaylistTitle: string = '';
  newPlaylistImage: string = '';
  userId: number = parseInt(localStorage.getItem('profile') || '0'); // ID del usuario actual
  listaEditada: any | null = null;


  constructor(private searchService: SearchService,
              private songService: SongService,
              private http: HttpClient) { }

  search() {
    this.searchService.search(this.query).subscribe(
      (results: any) => {
        console.log('Resultados de la búsqueda:', results);
        this.searchResults = results;
        this.canciones = results.canciones;
      },
      (error) => {
        console.error('Error al buscar:', error);
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

  ngOnInit(): void {
    this.loadPlaylists()
  }



}
