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

   isLoggedIn() {
      this.afAuth.authState.subscribe(data => {
         if (data && data.uid && data.email) {
            this.router.navigateByUrl('home');
         }
      });
   }

   async signupUser(data: any) {
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
                  random: this.randomInt(),
               };

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

   }

   async loginUser(email: string, password: string) {
      await this.startLoading()
      .then(async () => {
         try {
            await this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
               console.log(result);
               this.showLoading.dismiss();
               this.router.navigateByUrl('home');
            });
         } catch (error) {
            // console.log(error);
            this.showLoading.dismiss();
            this.errorAlert(error.message);
         }
      });

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

   signOutUser() {
     this.afAuth.auth.signOut();
     this.router.navigateByUrl('');
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
