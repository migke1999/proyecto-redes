import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClimaComponent } from './clima/clima.component';
import { LoginComponent } from './login/login.component';
import { AgmCoreModule } from '@agm/core';
import { RegisterComponent } from './register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// tslint:disable-next-line: one-variable-per-declaration


const config = {
  apiKey: 'AIzaSyCCzeXhJdHIvh8QJQ5fddMtnsGsaHZ0mHc',
  authDomain: 'clima-ce083.firebaseapp.com',
  projectId: 'clima-ce083',
  storageBucket: 'clima-ce083.appspot.com',
  messagingSenderId: '259210260697',
  appId: '1:259210260697:web:0027ef11e3655d22a58ec8',
  measurementId: 'G-EFKWWMQPHM'
};




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClimaComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule, // auth
    AppRoutingModule,
    FormsModule,
  ReactiveFormsModule,
    AgmCoreModule.forRoot({​​​​​​​​
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDQniHUNuBi5YVA2_jLnb0Z9RhwUWvvgKQ',
      libraries: ['places']
          }​​​​​​​​),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
