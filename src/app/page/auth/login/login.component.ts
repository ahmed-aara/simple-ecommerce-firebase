import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userData: User = {
    email: '',
    password: ''
  }

  message: any = null;

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.validate(this.userData)) {
      this.authservice.login(this.userData)
        .then(() => {
          this.router.navigateByUrl('/')
        }).catch(error => {
          throw error
        })
    }
  }

  validate(data: any) {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g.test(data.email)) {
      this.message = "Please Enter Email";
      return false;
    }

    if (data.password === '' || data.password === null || data.password === undefined) {
      this.message = "Please Enter Password";
      return false;
    }
    return true;
  }

}
