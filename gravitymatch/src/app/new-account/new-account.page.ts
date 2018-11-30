import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';

@Component({
   selector: 'app-new-account',
   templateUrl: './new-account.page.html',
   styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit {

   newAccountForm: FormGroup;
   emailInvalid: boolean;
   passwordInvalid: boolean;

   constructor(
      private formBuilder: FormBuilder,
      private authService: AuthenticationService,
   ) {
      this.newAccountForm = this.formBuilder.group({
          email: ['', Validators.compose([Validators.email,Validators.required])],
          password: ['', Validators.compose([Validators.pattern('.{8,}'), Validators.required])],
          gender: [''],
          age: [''],
         goal: [''],
         race: [''],
      })
   }

   ngOnInit() {
   }

   async onSignup() {
      await this.authService.signupUser(this.newAccountForm.value).then(() => {
         console.log("Successful signup");

      });
   }

   // signupUser(){
   //
   //    if (!this.signupForm.valid){
   //       console.log(this.signupForm.value);
   //    } else {
   //       if (this.agreeChckbox1) {
   //          this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password).then(() => {
   //
   //
   //          },
   //          error => {
   //             let alert = this.alertCtrl.create({
   //                message: error.message,
   //                buttons: [{text: "Ok", role: 'cancel'}]
   //             });
   //             alert.present();
   //          });
   //       } else {
   //          this.showToast('Please indicate that you have read and agree to the Privacy Policy and Terms of Service', 3000, 'bottom');
   //       }
   //    }
   //
   // }

   isValid(input: string) {
    if (input === 'email') {
       // check email
       this.emailInvalid = !(this.newAccountForm.controls[input].valid && this.newAccountForm.controls[input].dirty);
    } else {
       // check password
       this.passwordInvalid = !this.newAccountForm.controls[input].valid;
    }
   }

   resetValid(input: string) {
    if (input === 'email') {
       this.emailInvalid = false;
    } else {
       this.passwordInvalid = false;
    }
   }
}
