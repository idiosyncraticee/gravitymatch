import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User, MyfirestoreService } from '../services/myfirestore.service';

@Component({
   selector: 'app-my-matches',
   templateUrl: './my-matches.page.html',
   styleUrls: ['./my-matches.page.scss'],
})
export class MyMatchesPage implements OnInit {

   //matches: any;
   matches: User[];
   constructor(
      //private router: Router,
      public toastController: ToastController,
      private myfirestoreService: MyfirestoreService,
   ) { }




   ionViewDidEnter() {
      console.log("ionViewDidEnter");
      // this.matches =   [
      //    { name: "Ryan", location: "22 miles", mm: '12', rank: "4", show: "yes", headshot: "./assets/ryan.png" },
      //    { name: "Robbie", location: "22 miles", mm: '12', rank: "4", show: "yes" },
      //    { name: "Kyle", location: "22 miles", mm: '12', rank: "4", show: "yes" },
      //    { name: "Chris", location: "22 miles", mm: '12', rank: "4", show: "yes" },
      //    { name: "Patricia", location: "22 miles", mm: '12', rank: "4", show: "yes" },
      //    { name: "Joe", location: "22 miles", mm: '12', rank: "4", show: "yes" },
      //    { name: "Patrick", location: "22 miles", mm: '12', rank: "4", show: "yes" },
      // ];
      this.myfirestoreService.getMatches().subscribe(data => {
         this.matches = data.map(e => {
            return {
               id: e.payload.doc.id,
               ...e.payload.doc.data()
            } as User;
         })
      });
   }

   ngOnInit() {

   }


   approve(item, slidingItem) {
      console.log("approve");
      console.log(item);
      console.log(slidingItem);
      this.presentToastWithOptions()
      //this.router.navigate(['/favorites', { item: item }]);
   }

   async presentToastWithOptions() {
      const toast = await this.toastController.create({
        message: 'We will let them know you want to talk!',
        showCloseButton: false,
        position: 'middle',
        duration: 2000
      });
      toast.present();
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
