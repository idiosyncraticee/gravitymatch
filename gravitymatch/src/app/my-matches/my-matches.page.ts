import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
   selector: 'app-my-matches',
   templateUrl: './my-matches.page.html',
   styleUrls: ['./my-matches.page.scss'],
})
export class MyMatchesPage implements OnInit {

   matches: any;
   constructor(
      private router: Router,
   ) { }




   ionViewDidEnter() {
      console.log("ionViewDidEnter");
      this.matches =   [
         { name: "Ryan", location: "22 miles", mm: '12', rank: "4", show: "yes" },
         { name: "Robbie", location: "22 miles", mm: '12', rank: "4", show: "yes" },
         { name: "Kyle", location: "22 miles", mm: '12', rank: "4", show: "yes" },
         { name: "Chris", location: "22 miles", mm: '12', rank: "4", show: "yes" },
         { name: "Patricia", location: "22 miles", mm: '12', rank: "4", show: "yes" },
         { name: "Joe", location: "22 miles", mm: '12', rank: "4", show: "yes" },
         { name: "Patrick", location: "22 miles", mm: '12', rank: "4", show: "yes" },
      ];
   }

   ngOnInit() {


   }

   approve(item, slidingItem) {
      console.log("approve");
      console.log(item);
      console.log(slidingItem);
      this.router.navigate(['/favorites', { item: item }]);

   }


   decline(item, slidingItem) {
      console.log("decline");
      console.log(item);
      console.log(slidingItem);
      const index = this.matches.indexOf(item);
      if (index > -1) {
         this.matches.splice(index, 1);
      }
      console.log("Following splice");
      slidingItem.close();
   }

}
