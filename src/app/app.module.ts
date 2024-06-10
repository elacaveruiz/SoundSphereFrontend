import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { AlbumpageComponent } from './albumpage/albumpage.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from "@angular/forms";
import { AuthGuard } from './injectable/auth-guard';
import {AuthService} from "./service/auth.service";
import {AuthInterceptor} from "./injectable/auth.interceptor";
import { PlayBarComponent } from './play-bar/play-bar.component';
import { LateralComponent } from './lateral/lateral.component';
import {SongService} from "./service/song.service";
import { ArtistapageComponent } from './artistapage/artistapage.component';
import { ProfileComponent } from './profile/profile.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { LikesComponent } from './likes/likes.component';
import { SearchComponent } from './search/search.component';
import {SearchService} from "./service/search.service";


@NgModule({
  declarations: [
    AppComponent,

    InicioComponent,
    AlbumpageComponent,
    AuthComponent,
    PlayBarComponent,
    LateralComponent,
    ArtistapageComponent,
    ProfileComponent,
    PlaylistComponent,
    LikesComponent,
    SearchComponent
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
    SearchService,
    SongService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Habilitar la inyección múltiple para los interceptores
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
