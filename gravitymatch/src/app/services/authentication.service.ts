import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, LoadingController, AlertController } from '@ionic/angular';

import * as firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';

import { User, MyfirestoreService } from './myfirestore.service';

@Injectable({
   providedIn: 'root'
})
export class AuthenticationService {

   max_int: number = 2147483647;   // max 32-bit signed int
   showLoading: any;

   constructor(
      private afAuth: AngularFireAuth,
      private router: Router,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
      private myfirestoreService: MyfirestoreService,
   ) {

   }

   // isLoggedIn() {
   //    this.afAuth.authState.subscribe(data => {
   //       if (data && data.uid && data.email) {
   //          //this.router.navigateByUrl('home');
   //       }
   //    });
   // }

   // getUid() {
   //    this.afAuth.authState.subscribe(data => {
   //       if (data && data.uid && data.email) {
   //          this.router.navigateByUrl('home');
   //       }
   //    });
   // }

   async signupUser(data: any) {
      let mid: string;

      await this.startLoading()
      .then(async () => {
         try {
            await this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
            .then((result) => {
               console.log(data);
               console.log(result);
               var user:User = {
                  id: result.user.uid,
                  age: data.age,
                  gender: data.gender,
                  goal: data.goal,
                  race: data.race,
                  name: data.name,
                  random: this.randomInt(),
                  score: data.score,
                  attempts: data.attempts,
                  realuser: 1,
               };
               mid = result.user.uid;
               this.myfirestoreService.addUser(user);

               console.log(result);
               this.showLoading.dismiss();

            });
         } catch (error) {
            // console.log(error);
            this.showLoading.dismiss();
            this.errorAlert(error.message);
         }
      });
      return mid;
   }

   async loginUser(data: any) {
      let mid: string;
      await this.startLoading()
      .then(async () => {
         try {
            await this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password)
            .then((result) => {
               console.log(result);
               this.showLoading.dismiss();

               mid = result.user.uid;
            });
         } catch (error) {
            // console.log(error);
            this.showLoading.dismiss();
            this.errorAlert(error.message);
         }
      });
      return mid;
   }

   async forgotPassword(email: string) {
     let isSuccess: boolean;
     await this.startLoading().then(async () => {
       try {
         await this.afAuth.auth.sendPasswordResetEmail(email)
         .then(() => {
           isSuccess = true;
           this.showLoading.dismiss();
         });
       } catch (error) {
         // console.log(error);
         isSuccess = false;
         this.showLoading.dismiss();
         this.errorAlert(error.message);
       }
     });
     return isSuccess;

   }

   async signOutUser() {

     let isSuccess: boolean;
     await this.startLoading().then(async () => {
      try {
         await this.afAuth.auth.signOut()
         .then(() => {
          isSuccess = true;
          this.showLoading.dismiss();
         });
      } catch (error) {
         // console.log(error);
         isSuccess = false;
         this.showLoading.dismiss();
         this.errorAlert(error.message);
      }
     });
     return isSuccess;

   }

   async errorAlert(errMsg: string) {

      const alert = await this.alertCtrl.create({
         header: 'Error',
         message: errMsg,
         buttons: ['Ok']
      });
      return await alert.present();
   }

   async startLoading() {
      this.showLoading = await this.loadingCtrl.create({
         message: 'Signing In'
      });
      this.showLoading.present();
   }

   randomInt() {
       // generate random value between 1 and maxInt inclusive of both values
       return Math.floor(Math.random() * this.max_int) + 1;
   }

}
