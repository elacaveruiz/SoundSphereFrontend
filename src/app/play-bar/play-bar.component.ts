import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {SongService} from "../service/song.service";

@Component({
  selector: 'app-play-bar',
  templateUrl: './play-bar.component.html',
  styleUrls: ['./play-bar.component.css']
})
export class PlayBarComponent {

  currentSong: any;
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef;

  constructor(private songService: SongService) {
    this.songService.data$.subscribe(data => {
      console.log('Datos recibidos en PlayBarComponent:', data);
      this.currentSong = data;
      this.play();
    });
  }

  ngOnInit(): void {
    this.songService.data$.subscribe(song => {
      this.currentSong = song;
    });
  }

  play(): void {
    if (this.currentSong && this.currentSong.url) {
      const audioPlayer: HTMLAudioElement = this.audioPlayerRef.nativeElement;
      audioPlayer.src = this.currentSong.url;
      audioPlayer.load(); // Cargar el archivo de audio
      audioPlayer.play(); // Reproducir el archivo de audio
    } else {
      console.error('No se encontró la URL del archivo de audio.');
    }
  }

  previous() {
    // Lógica para retroceder a la canción anterior
  }

  next() {
    // Lógica para avanzar a la siguiente canción
  }
}
