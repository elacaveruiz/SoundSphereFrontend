import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from "./inicio/inicio.component";
import {AlbumpageComponent} from "./albumpage/albumpage.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./injectable/auth-guard";
import {ArtistapageComponent} from "./artistapage/artistapage.component";
import {ProfileComponent} from "./profile/profile.component";
import {PlaylistComponent} from "./playlist/playlist.component";
import {LikesComponent} from "./likes/likes.component";

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard]},
  { path: 'album/:id', component: AlbumpageComponent},
  { path: 'artista/:id', component:ArtistapageComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'perfil/:id', component: ProfileComponent},
  { path: 'lista/:id', component: PlaylistComponent},
  { path: 'like/:id', component: LikesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
