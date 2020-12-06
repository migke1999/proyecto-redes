import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  public email = '';
  public password = '';
  ngOnInit(): void {
  }
  onCreate(){
   // console.log("credenciales", this.email, " ", this.password)
    this.userService.registerUser(this.email, this.password)
    .then ((res) => {
      console.log("exito");
      this.router.navigate(['login']);
    }).catch((err) => {
      console.log("algo ha fallado", err.message);
    });
  }

  onSubmit(){
     this.router.navigate(['login']);
   }

}
