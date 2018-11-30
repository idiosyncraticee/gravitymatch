import { Component, OnInit } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { ClientProfilePage } from '../client-profile/client-profile.page';
import { User, MyfirestoreService } from '../services/myfirestore.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
   selector: 'app-match-game',
   templateUrl: './match-game.page.html',
   styleUrls: ['./match-game.page.scss'],
})
export class MatchGamePage implements OnInit {

   randos: User[];
   randos_count: number;
   client: User[];
   match_score: any[];

   rando1:any;
   rando1_name:any="Patrick";
   rando1_location:any="Spokane, WA";
   rando1_description:any="Triceratops breeder and amature water purifier.";
   rando2_name:any="Scott";
   rando2_location:any="Spokane, WA";
   rando2_description:any="Triple jointed luger.";
   rando3_name:any="Ryan";
   rando3_location:any="Spokane, WA";
   rando3_description:any="Able designer and cat babysitter.";
   rando2:any;
   rando3:any;
   star_color1:any;
   star_color2:any;
   star_color3:any;

   constructor(
      private modalCtrl:ModalController,
      private alertCtrl:AlertController,
      private myfirestoreService: MyfirestoreService,

   ) {}

   async openModal()
   {
      const modal = await this.modalCtrl.create({
         component: ClientProfilePage
      });

      return await modal.present();
   }

   closeModal()
   {
      this.modalCtrl.dismiss(null, undefined, null);
   }

   ngOnInit() {

      this.myfirestoreService.getUsers().subscribe(data => {
         this.randos = data.map(e => {
            return {
               id: e.payload.doc.id,
               ...e.payload.doc.data()
            } as User;
         })
         console.log("Made it ehehehehe");
      },(error) => {
         console.log("Error in match-game ngOnInit");
      },() => {
         console.log("Complete!")
      });

   }

   ionViewDidLoad() {
      console.log("ionViewDidLoad match-game");

   }

   ionViewDidEnter() {
      console.log("ionViewDidEnter match-game");

      this.myfirestoreService.getRandomUser().subscribe(data => {
         this.client = data.map(e => {
            return {
               id: e.payload.doc.id,
               ...e.payload.doc.data()
            } as User;
         })
      },(error) => {

      },() => {

      });

      this.myfirestoreService.getMatchmakerResult()
            .get().then(function(doc) {
         if (doc.exists) {
            this.matches
              console.log("Document data:", doc.data());
         } else {
              console.log("No such document!");
         }
      }).catch(function(error) {
         console.log("Error getting document:", error);
      });

     //MAKE A RANDOM NUMBER




      //console.log(this.randos);
      //
      // this.rando1 =
      // { name: "Ryan", location: "22 miles", mm: '12', rating: "4", show: true, description: "Saltwater aquarium enthusiast ... nay, zealot." };
      // this.rando2 =
      // { name: "Patricia", location: "22 miles", mm: '12', rating: "4", show: true, description: "Saltwater aquarium enthusiast ... nay, zealot." };
      // this.rando3 =
      // { name: "Chris", location: "22 miles", mm: '12', rating: "4", show: true, description: "Saltwater aquarium enthusiast ... nay, zealot." };
      this.star_color1 = [
         {rating: 0, color: "#00FF00", show: false},
         {rating: 1, color: "#00FF00", show: false},
         {rating: 2, color: "#00FF00", show: false},
         {rating: 3, color: "#00FF00", show: false},
         {rating: 4, color: "#00FF00", show: false}
      ];
      // this.star_color2 = [
      //    {rating: 0, color: "#00FF00", show: false},
      //    {rating: 1, color: "#00FF00", show: false},
      //    {rating: 2, color: "#00FF00", show: false},
      //    {rating: 3, color: "#00FF00", show: false},
      //    {rating: 4, color: "#00FF00", show: false}
      // ];
      // this.star_color3 = [
      //    {rating: 0, color: "#00FF00", show: false},
      //    {rating: 1, color: "#00FF00", show: false},
      //    {rating: 2, color: "#00FF00", show: false},
      //    {rating: 3, color: "#00FF00", show: false},
      //    {rating: 4, color: "#00FF00", show: false}
      // ];


   }

   //
   // star3(rating, item, slidingItem) {
   //
   //
   //    //await delay(300);
   //    console.log("rated");
   //    console.log(item);
   //    console.log(slidingItem);
   //    console.log(rating);
   //    const index = this.randos.indexOf(item);
   //    //if (index > -1) {
   //    //   this.randos.splice(index, 1);
   //    //   this.randos[index].show=false;
   //    //}
   //    for(var i = 0;i<5;i++) {
   //
   //
   //       this.star_color3[i].show=false;
   //
   //    }
   //    for(var i = 0;i<5;i++) {
   //       if(i<=rating.rating) {
   //          this.star_color3[i].show=true;
   //       }
   //    }
   //
   //
   //    //this.star_color[rating].color("#FFFF00");
   //
   //
   //    console.log("Following splice");
   //    //slidingItem.close();
   // }
   //
   // star2(rating, item, slidingItem) {
   //
   //
   //    //await delay(300);
   //    console.log("rated");
   //    console.log(item);
   //    console.log(slidingItem);
   //    console.log(rating);
   //    const index = this.randos.indexOf(item);
   //    //if (index > -1) {
   //    //   this.randos.splice(index, 1);
   //    //   this.randos[index].show=false;
   //    //}
   //    for(var i = 0;i<5;i++) {
   //       this.star_color2[i].show=false;
   //
   //    }
   //    for(var i = 0;i<5;i++) {
   //       if(i<=rating.rating) {
   //          this.star_color2[i].show=true;
   //       }
   //    }
   //
   //
   //    //this.star_color[rating].color("#FFFF00");
   //
   //
   //    console.log("Following splice");
   //    //slidingItem.close();
   // }
   //
   star1(rating, rando, slidingItem) {


      //await delay(300);
      console.log("rated");
      console.log(rando);
      console.log(slidingItem);
      console.log(rating);
      console.log("client = "+this.client);

      //if (index > -1) {
      //   this.randos.splice(index, 1);
      //   this.randos[index].show=false;
      //}
      for(var i = 0;i<5;i++) {

         this.star_color1[i].show=false;


      }
      for(var i = 0;i<5;i++) {
         if(i<=rating.rating) {
            this.star_color1[i].show=true;
         }
      }

      this.myfirestoreService.setMatch(this.client[0].id, rando, rating);
      //this.star_color[rating].color("#FFFF00");


      console.log("Following splice");
      //slidingItem.close();
   }



}
