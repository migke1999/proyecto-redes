import { FormGroup } from '@angular/forms';
import { ConsultaModel } from './../models/consulta.model';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class InquiriesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getRecentInquiriesByEmail(email: string){
    return this.httpClient.get(`https://localhost:44374/api/Consultas/${email}`);
  }

  insertInquirie(object: any){
    console.log(object); 

    return new Promise((resolve,reject)=>{
      this.httpClient.post("https://localhost:44374/api/Consultas",object).toPromise()
      .then(()=>{
        resolve("todo bien");
      }).catch(()=>{
        reject("error");
      })
    }) 

   
  }
}
