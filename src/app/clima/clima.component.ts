import { EmailService } from './../services/email.service';
import { ConsultaModel } from './../models/consulta.model';
import { InquiriesService } from './../services/inquiries.service';
import { WeatherService } from './../services/weather.service';
import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {

  formGroup_newInquirie: FormGroup = new FormGroup({
    _Temperatura: new FormControl(null),
    _Sensacion_termica: new FormControl(null),
    _Humedad: new FormControl(null),
    _Lugar: new FormControl(null), 
    _Latitud: new FormControl(null),
    _Longitud: new FormControl(null),
    _Nombre: new FormControl(null),
  });

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private location: Location,
    private weatherService: WeatherService,
    private inquiriesService: InquiriesService,
    private emailService: EmailService
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
      (res: any) => {
        console.log("consulta:");
        console.log(res);
        var nombre = this.emailService.getEmail();
        console.log("nombre", nombre);
        if(nombre!=null){
          

          var consulta= new ConsultaModel;
          consulta.Temperatura= res.main.temp-273;
            consulta.Humedad= res.main.humidity;
            consulta.Sensacion_termica= res.main.feels_like -273;
            consulta.Locacion= res.name+ ", " +res.sys.country;
            consulta.Latitud=this.lat;
            consulta.Longitud= this.lng;
            consulta.Nombre= nombre;
              //console.log("aqui va");
          this.inquiriesService.insertInquirie(consulta)
          .then((res) =>{
              console.log(res);
          }).catch(err=>{
              console.log(err);
          });
          this.currentWeather = res;
          this.currentWeather.main.temp = this.currentWeather.main.temp -273;
          this.currentWeather.main.feels_like = this.currentWeather.main.feels_like -273;
        }
       

      }
    );
  }

}
