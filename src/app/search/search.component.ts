import { Component } from '@angular/core';
import { SearchService } from '../service/search.service';
import {SongService} from "../service/song.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = '';
  searchResults: any;
  canciones: any[] = [];
  showAll: boolean = false;
  showAllArtists: boolean = false;
  showAllProfiles: boolean = false;

  constructor(private searchService: SearchService,
              private songService: SongService) { }

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
}
