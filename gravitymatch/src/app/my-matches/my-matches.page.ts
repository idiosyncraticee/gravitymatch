import { Component, OnInit, NavController } from '@angular/core';
   import { Router } from '@angular/router';


import { ClientProfilePage } from '../../client-profile/client-profile';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.page.html',
  styleUrls: ['./my-matches.page.scss'],
})
export class MyMatchesPage implements OnInit {

  constructor(
          private router: Router,
  ) { }

   matches =   [
      { name: "Ryan", location: "22 miles", mm: '12', rank: "4" },
      { name: "Robbie", location: "22 miles", mm: '12', rank: "4" },
      { name: "Kyle", location: "22 miles", mm: '12', rank: "4" },
      { name: "Chris", location: "22 miles", mm: '12', rank: "4" },
      { name: "Patricia", location: "22 miles", mm: '12', rank: "4" },
      { name: "Joe", location: "22 miles", mm: '12', rank: "4" },
      { name: "Patrick", location: "22 miles", mm: '12', rank: "4" },
   ];




  ngOnInit() {


  }

  approve(itemId) {

     this.router.navigate(['/login', { id: itemId }]);

 }
 decline(itemId) {
    console.log(itemId);
    
    //this.navCtrl.navigateRoot('/tabs/(account:account/login)');
}



}
