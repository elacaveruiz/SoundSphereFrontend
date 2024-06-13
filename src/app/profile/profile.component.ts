import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {  }

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
  goToEditProfile(): void {
    this.router.navigate(['/edit-profile']);
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

}
