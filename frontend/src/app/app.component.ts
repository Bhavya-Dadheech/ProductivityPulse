import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LoginAndRegistration';
  isLoginOrSignupRoute!: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginOrSignupRoute = ['login', 'signup'].includes(event.url);
      }else{
        this.isLoginOrSignupRoute = false;
      }
    });
  }
}
