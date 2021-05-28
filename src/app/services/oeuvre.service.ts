import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Network} from '@ionic-native/network/ngx';
import {Storage} from "@ionic/storage";
import {OeuvreModel} from "../models/oeuvre.model";

@Injectable({
  providedIn: 'root'
})
export class OeuvreService {
  private url: string = " http://localhost:3000/oeuvre";

  constructor(public http: HttpClient, private network: Network, private storage: Storage) {
  }

  getAll() {
    return this.http.get(this.url);
  }

  getById(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  add(oeuvre: OeuvreModel) {
    return this.http.post<OeuvreModel>(this.url, oeuvre);
  }

  async addFavorite(id: number) {
    let oldFav = await this.storage.get('favorites');
    if(oldFav) {
      // oldFav.value.push(id)
      console.log(oldFav)
      await this.storage.set('favorites', oldFav);
    } else {
      await this.storage.set('favorites', id);
    }

  }
}
