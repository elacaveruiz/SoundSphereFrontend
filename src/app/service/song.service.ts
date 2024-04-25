import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private dataSong = new Subject<any>();
  data$ = this.dataSong.asObservable();

  constructor() { }

  sendSong(data: any) {
    this.dataSong.next(data);
  }
}
