import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Chat',
      url: '/chat',
      icon: 'list'
    },
    {
      title: 'Chat List',
      url: '/chat_list',
      icon: 'list'
    },
    {
      title: 'Favorites',
      url: '/favorites',
      icon: 'list'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'list'
    },
    {
      title: 'Match Game',
      url: '/match_game',
      icon: 'list'
    },
    {
      title: 'Matchmaker Profile',
      url: '/matchmaker_profile',
      icon: 'list'
    },
    {
      title: 'My Matches',
      url: '/my_matches',
      icon: 'list'
    },
    {
      title: 'New Account',
      url: '/new_account',
      icon: 'list'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'list'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'list'
    },
    {
      title: 'Client Profile',
      url: '/client_profile',
      icon: 'list'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
