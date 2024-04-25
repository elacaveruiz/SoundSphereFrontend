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

  loginData: any = {};

  constructor(private authService: AuthService,
              private router: Router) {  }

  register(registroData: any): void {
    this.authService.register(registroData).subscribe(
      response => {
        console.log('Usuario registrado correctamente:', response);
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
