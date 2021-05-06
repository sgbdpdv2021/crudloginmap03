import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { Employee } from "../../models/employee";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;

  private longitude: any
  private latitude: any
  private office: any
  private name: any

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.longitude, this.latitude],
      zoom: 17
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const marker = L.marker([this.longitude, this.latitude]);

    marker.bindPopup(`<b>${this.name}, ${this.office}</b><br>${this.longitude},${this.latitude}.`).openPopup();
    marker.addTo(this.map);
    tiles.addTo(this.map);
  }

  // Usamos ActivatedRoute para recuperar parámetros
  constructor(private _Activatedroute: ActivatedRoute) { }
  // Ponemos valores iniciales del IES Punta del Verde venimos sin parámetros
  ngAfterViewInit(): void {
    let employee: Employee = JSON.parse(localStorage.getItem('employee'));
    this.longitude = employee.longitude
    this.latitude = employee.latitude
    this.office = employee.office
    this.name = employee.name
    this.initMap();
  }
}