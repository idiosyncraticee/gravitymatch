import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      //icon: 'home'
    },
    {
      title: 'Profile',
      url: '/client_profile',
    },
    {
      title: 'Matches',
      url: '/my_matches'
    },
    {
      title: 'Chat',
      url: '/chat_list'
    },
    {
      title: 'MatchGame',
      url: '/match_game'
    },
    {
      title: 'Onboarding',
      url: '/onboarding'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.router.navigate(['/home']);
    });
  }
}
