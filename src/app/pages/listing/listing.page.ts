import { Component, OnInit } from '@angular/core';
import {OeuvreService} from "../../services/oeuvre.service";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  oeuvres: Object;
  loaded: boolean = false;

  constructor(public oeuvreService: OeuvreService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loaded = false;
    this.oeuvreService.getAll().subscribe(oeuvres => {
      this.oeuvres = oeuvres;
      console.log(oeuvres)
    }).add( () => {
      this.loaded = true;
    });
  }
}
