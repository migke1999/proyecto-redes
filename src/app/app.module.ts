import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClimaComponent } from './clima/clima.component';
import { LoginComponent } from './login/login.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClimaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({​​​​​​​​
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey:'AIzaSyDQniHUNuBi5YVA2_jLnb0Z9RhwUWvvgKQ',
      libraries: ['places']
          }​​​​​​​​),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
