import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
   selector: 'app-new-account',
   templateUrl: './new-account.page.html',
   styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit {

   newAccountForm: FormGroup;
   emailInvalid: boolean;
   passwordInvalid: boolean;
   nameInvalid: boolean;

   constructor(
      private formBuilder: FormBuilder,
      private authService: AuthenticationService,
      private router: Router,
   ) {
      this.newAccountForm = this.formBuilder.group({
          email: ['', Validators.compose([Validators.email,Validators.required])],
          password: ['', Validators.compose([Validators.pattern('.{8,}'), Validators.required])],
          name: ['', Validators.compose([Validators.pattern('.{4,}'), Validators.required])],
          gender: ['Unknown'],
          age: [0],
         goal: [''],
         race: [''],
         score: [0],
         attempts: [0],
         realuser: [1],
      })
   }

   ngOnInit() {
   }

   async onSignup() {
      await this.authService.signupUser(this.newAccountForm.value).then((mid) => {


         if(typeof mid !== 'undefined') {
            console.log("Successful signup");
            //NAVIGATE TO HOME AND PROVIDE THE MATCHMAKER ID
            this.router.navigate(['/home', { mid: mid}]);
         } else {
            console.log("Unsuccessful signup");
         }
      });
   }

   isValid(input: string) {
    if (input === 'email') {
       // check email
       this.emailInvalid = !(this.newAccountForm.controls[input].valid && this.newAccountForm.controls[input].dirty);
    } else if(input === 'name') {
      this.nameInvalid = !(this.newAccountForm.controls[input].valid && this.newAccountForm.controls[input].dirty);
    } else if(input === 'password') {
       // check password
       this.passwordInvalid = !this.newAccountForm.controls[input].valid;
    }
   }

   resetValid(input: string) {
    if (input === 'email') {
       this.emailInvalid = false;
    } else if(input === 'name') {
       this.nameInvalid = false;
    } else if(input === 'password') {
       this.passwordInvalid = false;
    }
   }
}
