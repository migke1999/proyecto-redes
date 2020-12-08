import { WeatherService } from './../services/weather.service';
import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private location: Location,
    private weatherService: WeatherService
  ) { }

  lat: number = 21.9197223;
  lng: number = -102.3146856;
  zoom: number = 12;
  varesp: any; 
  varesp2: any; 
  address: string;
  private geoCoder;
  currentWeather: any;
  @ViewChild('search',{static: false}) searchElementRef: ElementRef;
  ngOnInit(): void {
  }

  markerDragEnd($event: any){
      console.log($event);
      this.lat=$event.coords.lat;
      this.lng=$event.coords.lng;  
     // this.varesp =$event.latLng.lat;
     // this.varesp2 =$event.latLng.lng;
      console.log("lat",this.lat,"long",this.lng);
     // console.log("latespecial",this.varesp);
  }

  async fnInitMap(): Promise<void> {
    await this.mapsAPILoader.load();
    this.setCurrentLocation();
    // tslint:disable-next-line: new-parens
    this.geoCoder = new google.maps.Geocoder;
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    // console.log("si genera autocomplete", autocomplete);
    autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.lat, this.lng);
      });
    }

  }

  getAddress(latitude, longitude) {
    console.log("getAdress", latitude," ", longitude);
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else{
         console.log('No se encontraron resultados');

        }
      } else {
        console.log(`Geocoder ha fallado${status}`);

      }

    });
  }

  fnGetWeather(){
    this.weatherService.getWeatherByCoords(this.lat, this.lng).subscribe(
      res => {
        console.log("consulta:");
        console.log(res);
        this.currentWeather = res;
      }
    );
  }

}
