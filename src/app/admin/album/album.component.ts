import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  albumes: any[] = [];

  constructor(
    private http: HttpClient) { }


  ngOnInit(): void {
    this.obtenerAlbumes();
  }

  obtenerAlbumes(): void {
    this.http.get<any[]>('http://localhost:8080/album').subscribe(
      albumes => {
        this.albumes = albumes;
      },
      error => {
        console.error('Error al obtener datos:', error);
      }
    );
  }
}
