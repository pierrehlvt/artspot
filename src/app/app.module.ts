import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IonicStorageModule} from "@ionic/storage-angular";
import {HttpClientModule} from '@angular/common/http';
import { Network } from '@ionic-native/network/ngx';

import { Camera } from '@ionic-native/camera/ngx'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Drivers} from "@ionic/storage";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot({
    name: 'artspot',
    driverOrder: [Drivers.IndexedDB] // , Drivers.LocalStorage
  }), AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, Network, Camera, SplashScreen, StatusBar, Geolocation

    ,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
