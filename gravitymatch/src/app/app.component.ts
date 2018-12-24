import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from './services/authentication.service';
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
     url: '/profile',
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
      title: 'Leaderboard',
      url: '/leaderboard'
    },
   {
     title: 'Logout',
     url: '/profile',
   },
   {
     title: 'Welcome',
     url: '/onboarding'
   },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthenticationService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      this.afAuth.authState.subscribe(user => {

          if (user != null) {
             this.router.navigate(['/home', { mid: user.uid}]);
          } else {
             this.router.navigate(['/onboarding']);
          }

      });

    });
  }

  async signOutUser() {
     await this.authService.signOutUser().then(() => {
        console.log("Successful logout");
        this.router.navigate(['/onboarding']);
     });
  }


}
