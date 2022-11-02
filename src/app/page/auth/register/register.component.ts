import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  type: any = [
    { title: 'As Buyer', value: 'buyer' },
    { title: 'As Seller', value: 'seller' }
  ]

  userData: User = {
    name: '',
    email: '',
    password: '',
    type: ''
  }

  message: any;

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  clearErrorMessage() {
    this.message = '';
  }

  register() {
    this.clearErrorMessage();
    if (this.validate(this.userData)) {
      this.authservice.register(this.userData)
        .then((data) => {
        }).catch(_error => {
          this.router.navigate(['/register'])
        })
    }
  }

  validate(data: any) {
    if (data.name === '' || data.name === null || data.name === undefined) {
      this.message = "Please Enter Name";
      return false;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g.test(data.email)) {
      this.message = "Please Enter Email";
      return false;
    }

    if (data.password === '' || data.password === null || data.password === undefined) {
      this.message = "Please Enter Password";
      return false;
    }

    if (data.type === '' || data.type === null || data.type === undefined) {
      this.message = "Please Enter Type Of Account";
      return false;
    }

    this.message = '';
    return true;
  }

}
