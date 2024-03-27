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
  { path: 'admin', component: AdminComponent },
  { path: 'admin/album', component: AlbumComponent },
  { path: 'admin/artista', component: ArtistaComponent },
  { path: 'admin/cancion', component: CancionComponent },
  { path: 'admin/usuario', component: UsuarioComponent },
  { path: 'admin/albumArtista', component: AlbumArtistaComponent },
  { path: 'admin/cancionArtista', component: CancionArtistaComponent },
  { path: 'admin/comentario', component: ComentarioComponent },
  { path: 'admin/evento', component: EventoComponent },
  { path: 'admin/eventoArtista', component: EventoArtistaComponent },
  { path: 'admin/follow', component: FollowComponent },
  { path: 'admin/genero', component: GeneroComponent },
  { path: 'admin/generoArtista', component: GeneroArtistaComponent },
  { path: 'admin/generoCancion', component: GeneroCancionComponent },
  { path: 'admin/likes', component: LikesComponent },
  { path: 'admin/lista', component: ListaComponent },
  { path: 'admin/listaCancion', component: ListaCancionComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/reproduccion', component: ReproduccionComponent },
  { path: 'admin/shares', component: SharesComponent },
  { path: 'admin/tokens', component: TokensComponent },
  { path: 'admin/usuarioLista', component: UsuarioListaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
