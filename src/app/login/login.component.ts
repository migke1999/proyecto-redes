import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
  // tslint:disable: quotemark
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  public email = '';
  public password = '';


  ngOnInit(): void {
  }

  onLogin(){
   // console.log("credenciales", this.email, " ", this.password)
    this.userService.loginUser(this.email, this.password)
    .then ((res) => {
      console.log("exito");
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
