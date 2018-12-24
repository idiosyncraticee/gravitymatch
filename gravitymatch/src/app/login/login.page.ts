import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-login',
   templateUrl: './login.page.html',
   styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   loginForm: FormGroup;
   emailInvalid: boolean;
   passwordInvalid: boolean;

   constructor(
      private formBuilder: FormBuilder,
      private authService: AuthenticationService,
      private router: Router,
   ) {
      this.loginForm = this.formBuilder.group({
         email: ['', Validators.compose([Validators.email,Validators.required])],
         password: ['', Validators.compose([Validators.pattern('.{8,}'), Validators.required])],
      })

   }

   ngOnInit() {
   }

   async onLogin() {
      await this.authService.loginUser(this.loginForm.value).then((mid) => {
         
         //NAVIGATE TO HOME AND PROVIDE THE MATCHMAKER ID
         if(typeof mid !== 'undefined') {
            console.log("Successful login");
            //NAVIGATE TO HOME AND PROVIDE THE MATCHMAKER ID
            this.router.navigate(['/home', { mid: mid}]);
         } else {
            console.log("Unsuccessful login");
         }

      });
   }

}
