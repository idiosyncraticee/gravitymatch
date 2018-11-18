import { Component, OnInit } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { ClientProfilePage } from '../client-profile/client-profile.page';

@Component({
   selector: 'app-match-game',
   templateUrl: './match-game.page.html',
   styleUrls: ['./match-game.page.scss'],
})
export class MatchGamePage implements OnInit {
   randos:any;
   star_color:any;

   constructor() { }

   ngOnInit() {
   }
   ionViewDidEnter() {
      console.log("ionViewDidEnter");
      this.randos =   [
         { name: "Ryan", location: "22 miles", mm: '12', rating: "4", show: true },
         { name: "Robbie", location: "22 miles", mm: '12', rating: "4", show: true },
         { name: "Kyle", location: "22 miles", mm: '12', rating: "4", show: true },
         { name: "Chris", location: "22 miles", mm: '12', rating: "4", show: true, description: "Saltwater aquarium enthusiast ... nay, zealot." },
         { name: "Patricia", location: "22 miles", mm: '12', rating: "4", show: true },
         { name: "Joe", location: "22 miles", mm: '12', rating: "4", show: true },
         { name: "Patrick", location: "22 miles", mm: '12', rating: "4", show: true },
      ];

      this.star_color = [
         {rating: 0, color: "#00FF00", show: false},
         {rating: 1, color: "#00FF00", show: false},
         {rating: 2, color: "#00FF00", show: false},
         {rating: 3, color: "#00FF00", show: false},
         {rating: 4, color: "#00FF00", show: false}
      ];
   }


   doSwipe(rando) {
      console.log(rando);
      console.log("siwped");
   }

   star(rating, item, slidingItem) {


      //await delay(300);
      console.log("rated");
      console.log(item);
      console.log(slidingItem);
      console.log(rating);
      const index = this.randos.indexOf(item);
      if (index > -1) {
         this.randos.splice(index, 1);
         this.randos[index].show=false;
      }
      for(var i = 0;i<5;i++) {

            this.star_color[i].show=false;

      }
      for(var i = 0;i<5;i++) {
         if(i<=rating.rating) {
            this.star_color[i].show=true;
         }
      }


      //this.star_color[rating].color("#FFFF00");


      console.log("Following splice");
      //slidingItem.close();
   }

   async function delay(ms: number) {
       return new Promise( resolve => setTimeout(resolve, ms) );
   }


}
