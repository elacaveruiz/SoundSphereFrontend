import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-lateral',
  templateUrl: './lateral.component.html',
  styleUrls: ['./lateral.component.css']
})
export class LateralComponent implements OnInit{

  userId!: number;
  listas: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  this.getUserPlaylists()
    this.userId = parseInt(localStorage.getItem('profile') || '0', 10);

  }

  getUserPlaylists(): void{
    const idUser = localStorage.getItem('profile');
    const url = `http://localhost:8080/playlist/user/${idUser}`;
    this.http.get<any[]>(url).subscribe(
      listas => {
        this.listas = listas;
      },
      error => {
        console.error('Error al obtener las listas de este usuario:', error);
      }
    );
  }

}
