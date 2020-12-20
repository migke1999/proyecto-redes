import { EmailService } from './../services/email.service';
import { LoginComponent } from './../login/login.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { InquiriesService } from '../services/inquiries.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
 
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements AfterViewInit  {

 // @ViewChild(LoginComponent) emailNormal: LoginComponent;
  constructor(
    private inquiriesService: InquiriesService,
    private emailService: EmailService
  ) { }
  recentInquiries: any;

  ngOnInit() {
    this.getCurrentInquiries();
  }
  ngAfterViewInit () {
   // console.log(this.emailNormal.email);
    // Ahora puedes utilizar el componente hijo
  }

  getCurrentInquiries(){
    var email = this.emailService.getEmail();
    console.log(email);
    if(email!=null){
      this.inquiriesService.getRecentInquiriesByEmail(email).subscribe(
        res => {
          console.log("consultas realizadas con exito:");
          console.log(res);
          this.recentInquiries = res;
        }
      );
    }
     
  }

}
