import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MonsterMarkersService } from '../monster-markers.service';

import { icon, Marker } from 'leaflet'
import { MonstersPSQLService } from '../monsters-psql.service';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png'
const shadowUrl = 'assets/marker-shadow.png'
const iconDefault = icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
    selector: 'app-report-map',
    templateUrl: './report-map.component.html',
    styleUrls: ['./report-map.component.css']
})
export class ReportMapComponent {
    map:any
    monsterMarkersService: MonsterMarkersService

    constructor(private monsterMarkersSerivce: MonsterMarkersService) {
        this.monsterMarkersService = monsterMarkersSerivce
    }

    // After view (HTML page) is loaded, do this: (sets up and displays map)
    ngAfterViewInit(): void {

        // Set the maps initial view
        this.map = L.map('mapID').setView([49.2, -123], 11);


        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        // After map inititation place monster markers
        this.monsterMarkersService.placeMonsterMarkers(this.map)

        // // Pin marker
        // var marker = L.marker([49.22276, -123.0076]).addTo(this.map);
        // // Popups binded to objects on map
        // marker.bindPopup("<b>Metrotown</b><br />cases reported.").openPopup();

    }
}
