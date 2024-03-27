import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from "./inicio/inicio.component";
import { AdminComponent } from "./admin/admin.component";
import { AlbumComponent } from "./admin/album/album.component";
import { ArtistaComponent } from "./admin/artista/artista.component";
import { CancionComponent } from "./admin/cancion/cancion.component";
import { UsuarioComponent } from "./admin/usuario/usuario.component";
import { AlbumArtistaComponent } from "./admin/album-artista/album-artista.component";
import { CancionArtistaComponent } from "./admin/cancion-artista/cancion-artista.component";
import { ComentarioComponent } from "./admin/comentario/comentario.component";
import { EventoComponent } from "./admin/evento/evento.component";
import { EventoArtistaComponent } from "./admin/evento-artista/evento-artista.component";
import { FollowComponent } from "./admin/follow/follow.component";
import { GeneroComponent } from "./admin/genero/genero.component";
import { GeneroArtistaComponent } from "./admin/genero-artista/genero-artista.component";
import { GeneroCancionComponent } from "./admin/genero-cancion/genero-cancion.component";
import { LikesComponent } from "./admin/likes/likes.component";
import { ListaComponent } from "./admin/lista/lista.component";
import { ListaCancionComponent } from "./admin/lista-cancion/lista-cancion.component";
import { LoginComponent } from "./admin/login/login.component";
import { ReproduccionComponent } from "./admin/reproduccion/reproduccion.component";
import { SharesComponent } from "./admin/shares/shares.component";
import { TokensComponent } from "./admin/tokens/tokens.component";
import { UsuarioListaComponent } from "./admin/usuario-lista/usuario-lista.component";

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'admin', component: AdminComponent, children: [
      { path: 'album', component: AlbumComponent },
      { path: 'artista', component: ArtistaComponent },
      { path: 'cancion', component: CancionComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'albumArtista', component: AlbumArtistaComponent },
      { path: 'cancionArtista', component: CancionArtistaComponent },
      { path: 'comentario', component: ComentarioComponent },
      { path: 'evento', component: EventoComponent },
      { path: 'eventoArtista', component: EventoArtistaComponent },
      { path: 'follow', component: FollowComponent },
      { path: 'genero', component: GeneroComponent },
      { path: 'generoArtista', component: GeneroArtistaComponent },
      { path: 'generoCancion', component: GeneroCancionComponent },
      { path: 'likes', component: LikesComponent },
      { path: 'lista', component: ListaComponent },
      { path: 'listaCancion', component: ListaCancionComponent },
      { path: 'login', component: LoginComponent },
      { path: 'reproduccion', component: ReproduccionComponent },
      { path: 'shares', component: SharesComponent },
      { path: 'tokens', component: TokensComponent },
      { path: 'usuarioLista', component: UsuarioListaComponent },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
