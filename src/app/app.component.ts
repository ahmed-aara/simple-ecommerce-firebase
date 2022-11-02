import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  option: any = true;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
        let currentUrlPath = event.url.slice(1).split(urlDelimitators)[0];

        var route = ['login', 'register']
        for (var i = 0; i <= route.length; i++) {
          if (route[i] != currentUrlPath) {
            this.option = true
          } else {
            this.option = false
            break
          }
        }

      }
    });


  }

}
