import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
emailForInquirie;
  constructor() { }

  sendEmail(email){
this.emailForInquirie = email;
  }

  getEmail(){
    return this.emailForInquirie;
  }
}
