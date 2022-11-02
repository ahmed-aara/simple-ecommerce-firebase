import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  userData: any = {
    name: '',
    email: '',
    type: ''
  }

  dataSource: any = []
  user_id: any

  constructor(public authservice: AuthService, private store: AngularFirestore) { }

  ngOnInit(): void {
    let interval = setInterval(() => {
      if (this.authservice.currentUser_id) {
        this.getUserDetail(this.authservice.currentUser_id)
        clearInterval(interval)
      }
    }, 1000);
  }

  getUserDetail(user_id: any) {
    this.user_id = user_id
    this.store.collection('users').doc(user_id).get().subscribe((response) => {
      this.userData = response.data()
    })
  }

  logout() {
    this.authservice.logout()
  }

}
