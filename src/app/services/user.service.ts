import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import {AngularFireAuth} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afsAuth: AngularFireAuth) { }

  registerUser(email: string, pass: string){
    return new Promise((resolve,reject)=> {
      // tslint:disable-next-line: no-unused-expression
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then( userData => resolve(userData),
      err=> reject(err));
    });
  }

  loginUser(email: string, pass: string){
    return new Promise((resolve,reject)=> {
      // tslint:disable-next-line: no-unused-expression
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then( userData => resolve(userData),
      err=> reject(err));
    });
  }

  isAuth(){
   // return this.afsAuth.authState.pipe( map(auth => auth));
  }

  logoutUser(){
    return this.afsAuth.auth.signOut();
  }
}
