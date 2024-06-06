import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {SongService} from "../service/song.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-play-bar',
  templateUrl: './play-bar.component.html',
  styleUrls: ['./play-bar.component.css']
})
export class PlayBarComponent {


  currentSong: any;
  songs: any[] = [];
  isPlaying: boolean = false;
  volume: number = 1; // Volumen inicial
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef;


  progress: number = 0; // Progreso de la reproducción
  currentTime: number = 0; // Tiempo actual de la reproducción en segundos
  duration: number = 0; // Duración total de la canción en segundos

  constructor(private songService: SongService,
              private http: HttpClient) {
    this.songService.data$.subscribe(data => {
      console.log('Datos recibidos en PlayBarComponent:', data);
      this.currentSong = data.selectedSong;
      this.songs = data.playlist;
      this.duration = this.currentSong.duracion
      this.play();
    });
  }

  ngAfterViewInit(): void {
    // Suscribirse al evento 'canplay' del reproductor de audio
    const audioPlayer: HTMLAudioElement = this.audioPlayerRef.nativeElement;
    audioPlayer.addEventListener('canplay', () => {
      if (this.currentSong && this.isPlaying) {
        audioPlayer.play(); // Iniciar la reproducción si la canción está lista y se está reproduciendo
      }
    });

    audioPlayer.addEventListener('ended', () => {
      this.playNext();
    });


    // Evento para actualizar la barra de progreso
    audioPlayer.addEventListener('timeupdate', () => {
      this.currentTime = audioPlayer.currentTime;
      this.progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    });
  }

  play(): void {
    if (this.currentSong) {
      const audioPlayer: HTMLAudioElement = this.audioPlayerRef.nativeElement;
      audioPlayer.src = `assets/music/${this.currentSong.id}.mp3`;
      audioPlayer.load(); // Cargar el archivo de audio
      this.isPlaying = true; // Actualizar el estado de reproducción
      audioPlayer.play();
      this.registerPlayback(this.currentSong.id);
    } else {
      console.error('No se encontró la URL del archivo de audio.');
    }
  }

  pause(): void {
    const audioPlayer: HTMLAudioElement = this.audioPlayerRef.nativeElement;
    audioPlayer.pause();
    this.isPlaying = false;
  }

  togglePlayPause(): void {
    const audioPlayer: HTMLAudioElement = this.audioPlayerRef.nativeElement;
    if (this.isPlaying) {
      audioPlayer.pause(); // Pausar la reproducción si la canción está reproduciéndose
      this.isPlaying = false; // Actualizar el estado de reproducción
    } else {
      audioPlayer.play(); // Reanudar la reproducción si la canción está pausada
      this.isPlaying = true; // Actualizar el estado de reproducción
    }
  }

  playNext(): void {
    if (this.currentSong && this.songs.length > 0) {
      const currentIndex = this.songs.findIndex(song => song.id === this.currentSong.id);
      const nextIndex = (currentIndex + 1) % this.songs.length; // Obtener el índice de la siguiente canción
      this.currentSong = this.songs[nextIndex]; // Actualizar la canción actual
      this.duration = this.currentSong.duracion;
      this.play();
    }
  }

  playPrevious(): void {
    if (this.currentSong && this.songs.length > 0) {
      const currentIndex = this.songs.findIndex(song => song.id === this.currentSong.id);
      const previousIndex = (currentIndex - 1 + this.songs.length) % this.songs.length; // Obtener el índice de la canción anterior
      this.currentSong = this.songs[previousIndex]; // Actualizar la canción actual
      this.duration = this.currentSong.duracion;

      if (previousIndex === this.songs.length - 1 && !this.isPlaying) {
        this.play();
      } else {
        this.play();
      }
    }
  }

  registerPlayback(songId: number): void {
    const idLogin = localStorage.getItem('user');
    const url = `http://localhost:8080/reproduction/${songId}/${idLogin}`;

    console.log('URL enviada al backend:', url); // Mostrar la URL que se enviará al backend

    this.http.post(url,{}).subscribe(
      () => {
        console.log('Reproducción registrada correctamente.');
      },
      error => {
        console.error('Error al registrar la reproducción:', error);
      }
    );
  }

  adjustVolume(): void {
    const audioPlayer: HTMLAudioElement = this.audioPlayerRef.nativeElement;
    audioPlayer.volume = this.volume; // Actualizar el volumen del reproductor de audio
  }

  getVolumeIcon(): string {
    if (this.volume === 0) {
      return '/assets/images/vol0.png';
    } else if (this.volume <= 0.33) {
      return '/assets/images/vol33.png';
    } else if (this.volume <= 0.66) {
      return '/assets/images/vol66.png';
    } else {
      return '/assets/images/vol100.png';
    }
  }

  toggleVolume(): void {
    if (this.volume === 0) {
      this.volume = 0.5; // Si el volumen es 0, establecerlo en 0.5
    } else {
      this.volume = 0; // Si el volumen es mayor que 0, establecerlo en 0
    }
    const audioPlayer: HTMLAudioElement = this.audioPlayerRef.nativeElement;
    audioPlayer.volume = this.volume; // Establecer el volumen real del reproductor de audio
  }


  seek(event: any): void {
    const audioPlayer: HTMLAudioElement = this.audioPlayerRef.nativeElement;
    const seekTime = (event.target.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
  }

  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const secs: number = Math.floor(seconds % 60);
    return `${this.padZero(minutes)}:${this.padZero(secs)}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}
