import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authTokenKey  = 'token';
  private authRoleKey = 'rol';
  private authUserKey = 'user';
  baseUrl: String = "http://localhost:8080/auth";

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    userData.rol = "USUARIO";
    return this.http.post<any>(`${this.baseUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token); // Almacenar el token en el almacenamiento local
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token'); // Utiliza la clave correcta 'token' para recuperar el token del localStorage
  }

  clearAuthToken(): void {
    localStorage.removeItem(this.authTokenKey); // Eliminar el token del almacenamiento local
  }

  setRole(rol: string): void {
    localStorage.setItem(this.authRoleKey, rol); // Almacenar el rol en el localStorage
  }

  getRole(): string | null {
    return localStorage.getItem(this.authRoleKey); // Obtener el rol del localStorage
  }

  setUser(user: string): void {
    localStorage.setItem(this.authUserKey, user); // Almacenar el rol en el localStorage
  }

  getUser(): string | null {
    return localStorage.getItem(this.authUserKey); // Obtener el rol del localStorage
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
