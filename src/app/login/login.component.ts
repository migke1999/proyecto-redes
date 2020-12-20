import { NavbarComponent } from './../navbar/navbar.component';
import { EmailService } from './../services/email.service';
import { Component, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
  // tslint:disable: quotemark
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild(NavbarComponent) child!: NavbarComponent;
  constructor(
    private router: Router,
    private userService: UserService,
    private emailService: EmailService
  ) {}

  public email = '';
  public password = '';
  // @Output() emailToSend = new EventEmitter<string>();

  emailNormal: string;
  
  ngAfterViewInit() {
  }


  onLogin(){
   // console.log("credenciales", this.email, " ", this.password)
    this.userService.loginUser(this.email, this.password)
    .then ((res) => {
      console.log("exito");
     // this.emailToSend.emit(this.email)
      this.emailService.sendEmail(this.email);

     // this.child.blnIsEnabled = false;
      this.router.navigate(['clima']);
    }).catch((err) => {
      console.log("algo ha fallado", err.message);
    });
  }


  onSubmit(){
   // this.router.navigate(['clima']);
  }

  onLogout(){
    this.userService.logoutUser();
  }

}
