import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {filter, map} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SoundSphere';
  showPlayBar: boolean = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => event as NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.showPlayBar = !event.url.includes('/auth');
      });
  }
}
