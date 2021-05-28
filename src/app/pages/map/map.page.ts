import { Component, OnInit } from '@angular/core';
import Mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {Storage} from '@ionic/storage';
import {OeuvreService} from "../../services/oeuvre.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  longitude:any;
  latitude:any;
  oeuvres: Object;
  loaded: boolean = false;

  constructor(private storage: Storage,public oeuvreService: OeuvreService
  ) { }

  async ngOnInit() {
    this.latitude = await this.storage.get('latitude');
    this.longitude = await this.storage.get('longitude');
    Mapboxgl.accessToken = environment.mapBoxToken;
    var map = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 11,
      center: [this.longitude, this.latitude],
    });
    map.addControl(
      new Mapboxgl.GeolocateControl({
        showUserLocation: true,
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    this.oeuvreService.getAll().subscribe(oeuvres => {
      console.log(oeuvres)
      const size = Object.keys(oeuvres).length;

      for (let i = 0; i <= size - 1; i++) {

        var geojson = {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [oeuvres[i].location.latitude, oeuvres[i].location.latitude]
            },
            properties: {
            }
          }]
        };
      }
    }).add( () => {
      this.loaded = true;
    });

  }

}
