import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { AdminComponent } from './admin/admin.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { AlbumComponent } from './admin/album/album.component';
import { ArtistaComponent } from './admin/artista/artista.component';
import { CancionComponent } from './admin/cancion/cancion.component';
import { UsuarioComponent } from './admin/usuario/usuario.component';
import { AlbumArtistaComponent } from './admin/album-artista/album-artista.component';
import { CancionArtistaComponent } from './admin/cancion-artista/cancion-artista.component';
import { ComentarioComponent } from './admin/comentario/comentario.component';
import { EventoComponent } from './admin/evento/evento.component';
import { EventoArtistaComponent } from './admin/evento-artista/evento-artista.component';
import { FollowComponent } from './admin/follow/follow.component';
import { GeneroComponent } from './admin/genero/genero.component';
import { GeneroArtistaComponent } from './admin/genero-artista/genero-artista.component';
import { GeneroCancionComponent } from './admin/genero-cancion/genero-cancion.component';
import { LikesComponent } from './admin/likes/likes.component';
import { ListaComponent } from './admin/lista/lista.component';
import { ListaCancionComponent } from './admin/lista-cancion/lista-cancion.component';
import { LoginComponent } from './admin/login/login.component';
import { ReproduccionComponent } from './admin/reproduccion/reproduccion.component';
import { SharesComponent } from './admin/shares/shares.component';
import { TokensComponent } from './admin/tokens/tokens.component';
import { UsuarioListaComponent } from './admin/usuario-lista/usuario-lista.component';
import { AlbumpageComponent } from './albumpage/albumpage.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from "@angular/forms";
import { AuthGuard } from './injectable/auth-guard';
import {AuthService} from "./service/auth.service";
import {AuthInterceptor} from "./injectable/auth.interceptor";


@NgModule({
  declarations: [
    AppComponent,



    InicioComponent,
    AdminComponent,
    AlbumComponent,
    ArtistaComponent,
    CancionComponent,
    UsuarioComponent,
    AlbumArtistaComponent,
    CancionArtistaComponent,
    ComentarioComponent,
    EventoComponent,
    EventoArtistaComponent,
    FollowComponent,
    GeneroComponent,
    GeneroArtistaComponent,
    GeneroCancionComponent,
    LikesComponent,
    ListaComponent,
    ListaCancionComponent,
    LoginComponent,
    ReproduccionComponent,
    SharesComponent,
    TokensComponent,
    UsuarioListaComponent,
    AlbumpageComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Habilitar la inyección múltiple para los interceptores
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
