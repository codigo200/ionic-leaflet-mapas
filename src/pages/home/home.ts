import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import L from "leaflet";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: L.Map;
  center: L.PointTuple;
  tempIcon: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  }

  /**
   *  Inicializamos el mapa cuando la página culmina de cargar
   */
  ionViewDidLoad() {

    this.center = [23.03, -81.57]; //Matanzas, Cuba

    this.initMap();

    this.mensaje("Pulse sobre un punto en el mapa para añadir un nuevo lugar");

    this.tempIcon = L.icon({
      iconUrl: 'assets/imgs/marker.png',
      shadowUrl: '',
      iconSize: [32, 32], // size of the icon
      shadowSize: [0, 0], // size of the shadow
      iconAnchor: [32, 32], // point of the icon which will correspond to markers location
      shadowAnchor: [0, 0],  // the same for the shadow
      popupAnchor: [32, 20] // point from which the popup should open relative to the iconAnchor
    });

    this.map.on('click', (e) => { this.onMapClick(e) });

  }

  /**
   * Función a ejecutar cuando se pulsa sobre un marcador colocado.
   */
  showMarkerMenu() {
    this.mensaje("Se ha pulsado click en un marcador puesto.");
  }

  /**
   * Función que se dispara cuando se pulsa sobre el mapa.
   */
  onMapClick(e) {
    let tempMarker = L.marker(e.latlng, { icon: this.tempIcon })
      .on('click', this.showMarkerMenu, this)
      .addTo(this.map);

    this.mensaje("Pulsada la coordenada: " + e.latlng);

  }

  /**
   * Función que inicializa la posición donde abriremos el mapa (Coordenada incial)
   */
  initMap() {

    this.map = L.map('map', {
      center: this.center,
      zoom: 13
    });

    //Adicionamos la ruta de OSM.
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; Código 200'
    })
      .addTo(this.map);

  }

  /**
   * Función sencilla para mostrar un mensaje.
   * @param texto Mensaje a mostrar.
   */
  mensaje(texto) {
    let toast = this.toastCtrl.create({
      message: texto,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}
