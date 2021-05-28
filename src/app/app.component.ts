import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Storage} from '@ionic/storage';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar,
              private geolocation: Geolocation,
              private storage: Storage,
              private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.create();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.geolocation.getCurrentPosition().then((resp) => {
        this.storage.set('latitude', resp.coords.latitude);
        this.storage.set('longitude', resp.coords.longitude);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }
}
