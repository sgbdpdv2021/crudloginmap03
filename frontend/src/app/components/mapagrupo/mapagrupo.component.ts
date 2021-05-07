import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Employee } from "../../models/employee";

@Component({
  selector: 'app-mapagrupo',
  templateUrl: './mapagrupo.component.html',
  styleUrls: ['./mapagrupo.component.css']
})
export class MapagrupoComponent implements AfterViewInit {

  private map: any;

  private initMap(): void {
    this.map = L.map('map')

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
   
    let markerArray = []

    let employees: Array<Employee> = JSON.parse(localStorage.getItem('employeesfilter'));


    for (let employee of employees){ 
      let marker = L.marker([employee.longitude, employee.latitude])
        .bindPopup(`<b>${employee.name}, ${employee.office}</b><br>${employee.longitude},${employee.latitude}.`)
        .openPopup();
      markerArray.push(marker)
    }

    let group = L.featureGroup(markerArray).addTo(this.map)

    this.map.fitBounds(group.getBounds(), {
      padding: [70, 70]
    })
    
  }

  constructor() { }
  ngAfterViewInit(): void {
    this.initMap();
  }

}
