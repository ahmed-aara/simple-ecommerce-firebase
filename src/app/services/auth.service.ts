import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(private afu: AngularFireAuth, private router: Router, private store: AngularFirestore) {
    this.afu.authState.subscribe((auth => {
      localStorage.setItem('user', JSON.stringify(auth))
      this.authState = auth;
    }))
  }

  get currentUser_id(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  register(data: any) {

    return this.afu.createUserWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        this.authState = user
        //Add in Firebase Store
        this.store.collection('users').doc(this.authState.user.uid).set(
          {
            name: data.name,
            email: data.email,
            type: data.type
          }
        );
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  login(data: any) {
    return this.afu.signInWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        throw error
      });
  }

  logout(): void {
    this.afu.signOut();
    this.router.navigate(['/login']);
  }


}
