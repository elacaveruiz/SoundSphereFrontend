import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  novedades: any[] = [];
  showAll: boolean = false;

  constructor(private http: HttpClient) {  }

  ngOnInit(): void {
    this.getLatestAlbums();
  }

  getLatestAlbums(): void {
    this.http.get<any[]>('http://localhost:8080/album/latest').subscribe(
      novedades => {
        this.novedades = novedades;
      },
      error => {
        console.error('Error al obtener los últimos álbumes:', error);
      }
    );
  }

}
//<>
