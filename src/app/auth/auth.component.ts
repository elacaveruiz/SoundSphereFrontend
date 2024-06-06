import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  registroData: any = {};
  userData: any =  {};

  loginData: any = {};

  constructor(private authService: AuthService,
              private router: Router) {  }

  register(registroData: any, userData: any): void {
    this.authService.register(registroData).subscribe(
      response => {
        console.log('Usuario registrado correctamente:', response);
        const idLogin = response.idLogin;
        userData.loginId = idLogin;

        console.log(userData);
        this.authService.createUser(userData).subscribe(
          response => {
            console.log('Perfil creado correctamente:', response);
          },
          error => {
            console.error('Error al crear el perfil:', error);
          }
        );
      },
      error => {
        console.error('Error al registrar el usuario:', error);
      }
    );

  }

  login(loginData: any): void {
    this.authService.login(loginData).subscribe(
      response => {
        if (response.token) {
          this.authService.setAuthToken(response.token);
          this.authService.setRole(response.rol);
          this.authService.setUser(response.idLogin);
          localStorage.setItem('profile', response.idUser)
          console.log('Usuario logeado correctamente:', response);

          this.router.navigate(['/inicio']);
        } else {
          console.error('El token no se recibió del backend.');
        }
      },
      error => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }

}
