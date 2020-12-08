import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = 'fb8826b8393e986781880653ad560d3a';
  URI: string;

  constructor(
    private httpClient: HttpClient
  ) { }

  getWeatherByCoords(lat: number, long: number){
    return this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.apiKey}`);
  }
}
