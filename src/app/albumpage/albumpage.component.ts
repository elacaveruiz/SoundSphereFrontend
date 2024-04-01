import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-albumpage',
  templateUrl: './albumpage.component.html',
  styleUrls: ['./albumpage.component.css']
})
export class AlbumpageComponent implements OnInit{

albumData: any;
albumId!: number;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // Obtener el ID del álbum de la ruta
    this.route.params.subscribe(params => {
      this.albumId = params['id'];
      // Llamar a la función para obtener los detalles del álbum
      this.getAlbumDetails(this.albumId);
    });
  }

  getAlbumDetails(albumId: number): void {
    // Hacer la solicitud HTTP para obtener los detalles del álbum
    this.http.get<any>('http://localhost:8080/album/' + albumId).subscribe(
      album => {
        this.albumData = album;
      },
      error => {
        console.error('Error al obtener los detalles del álbum:', error);
      }
    );
  }
}
