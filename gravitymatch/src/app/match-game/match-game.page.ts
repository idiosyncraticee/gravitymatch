import { Component, OnInit } from '@angular/core';
import { AlertController,ModalController,ToastController } from '@ionic/angular';
import { ClientProfilePage } from '../client-profile/client-profile.page';
import { User, MyfirestoreService } from '../services/myfirestore.service';
//import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

class UserMatch extends User {
   // properties
   match_score?: number;

}

@Component({
   selector: 'app-match-game',
   templateUrl: './match-game.page.html',
   styleUrls: ['./match-game.page.scss'],
})
export class MatchGamePage implements OnInit {

   randos: UserMatch[];
   randos_count: number;
   client: any;
   matchmaker_data:User;
   mid: string;
   cid: string;

   star_color1:any = [
      {rating: 0, color: "#00FF00", show: false},
      {rating: 1, color: "#00FF00", show: false},
      {rating: 2, color: "#00FF00", show: false},
      {rating: 3, color: "#00FF00", show: false},
      {rating: 4, color: "#00FF00", show: false}
   ];


   constructor(
      private modalCtrl:ModalController,
      private alertCtrl:AlertController,
      //private toastController:ToastController,
      private myfirestoreService: MyfirestoreService,
      //private afAuth: AngularFireAuth,
      private router: Router,
      private route: ActivatedRoute,
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

   }

   ionViewDidLoad() {
      console.log("ionViewDidLoad match-game");

   }

   ionViewDidEnter() {
      console.log("ionViewDidEnter match-game");

      this.mid = this.route.snapshot.paramMap.get('mid');
      this.cid = this.route.snapshot.paramMap.get('cid');
      console.log("this.mid: "+this.mid);
      var that = this;
      this.myfirestoreService.getMatchmakerData(this.mid).subscribe(data => {
         data.map(m => {
            this.matchmaker_data = m.payload.doc.data()


               //this.client = this.getClient(cdata)[0];
               //this.client = this.getClient(this.cid)[0];
               this.client = this.myfirestoreService.getClientData();

               if(this.client == null) {
                  alert("Resetting...");
                  this.router.navigate(['/home',{mid:this.mid}]);
               }

               this.myfirestoreService.getFilteredUsers().subscribe(rdata => {
                  var all_randos = rdata.map(e => {
                     if((e.payload.doc.data().gender != that.client.gender) && (e.payload.doc.data().gender != "Unknown")) {
                        var match_score;
                        if(this.matchmaker_data.matches != null) {

                           for(var i = 0;i<that.matchmaker_data.matches.length;i++) {

                              if(that.matchmaker_data.matches[i].rid==e.payload.doc.id && that.matchmaker_data.matches[i].cid==that.client.id){
                                 //console.log("MATCH!!!: that.matchmaker_data.matches[i].rid:"+that.matchmaker_data.matches[i].rid+ " e.payload.doc.id:"+e.payload.doc.id);
                                 match_score = that.matchmaker_data.matches[i].score;
                              } else {
                                 //console.log("NO MATCH. that.matchmaker_data.matches[i].rid:"+that.matchmaker_data.matches[i].rid+ " e.payload.doc.id:"+e.payload.doc.id);
                              }
                           }
                        }
                        return {
                           id: e.payload.doc.id,
                           match_score: match_score+1,
                           ...e.payload.doc.data()
                        } as UserMatch;
                     }


                  })
                  that.randos = all_randos.filter(item => item);

                  //this.getMatchScore(data);
               },(error) => {
                  console.log("Error in match-game ngOnInit");
               },() => {
                  console.log("Complete!")
               });

         });
      });
   }

   star1(rating, rando:string, slidingItem) {

      //event.preventDefault();
      //event.stopPropagation();

      //await delay(300);
      console.log("rated");
      console.log(rando);
      console.log(rating);
      console.log(this.client);

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


      if(this.matchmaker_data.matches != null) {
         for(var i = 0;i<this.matchmaker_data.matches.length;i++) {
            if(this.matchmaker_data.matches[i].rid==rando && this.matchmaker_data.matches[i].cid==this.client.id){
               this.showMessage("Skipping","You've already matched them.");
               return;
            }
         }
      }
      console.log(this.matchmaker_data.matches);
      //this.myfirestoreService.updateMatch(this.mid, this.client.id, rando, rating);
      //this.star_color[rating].color("#FFFF00");
      this.myfirestoreService.getMatchResult(this.client.id, rando).subscribe(result => {
         console.log(result);
         if(result.length==0) {
            //IF THERE IS NO DATA ON THIS MATCH
            this.showMessage("We'll See!","Your match is recorded.  Now let's see if they hit it off");
            this.myfirestoreService.updateMatchmaker(this.matchmaker_data.id, 0, this.client.id, rando, rating);
         } else {
            result.map(r => {
               var match = r.payload.doc.data()

               var matchmaker_score:number;
               if(match['match']==0 && rating<2) {
                  this.showMessage("Correct!","They did not hit it off.");
                  matchmaker_score=10;
               } else if(match['match']==0 && rating>2) {
                  this.showMessage("Wrong!","They are not a good fit.");
                  matchmaker_score=-10;
               } else if(match['match']==1 && rating>2) {
                  this.showMessage("Correct!","You're a regular Cupid!");
                  matchmaker_score=10;
               } else if(match['match']==1 && rating<2) {
                  this.showMessage("Wrong!","That one would have worked out.");
                  matchmaker_score=-10;
               } else {
                  this.showMessage("Thanks!","Let's see if they hit it off.");
                  matchmaker_score=0;
                  //THIS IS THE 3 STAR SELECTION
                  //this.showMessage("Correct!","Ding, ding, din!  They're a match");
               }

               console.log("Calling updateMatchmakerScore")
               this.myfirestoreService.updateMatchmaker(this.matchmaker_data.id, matchmaker_score, this.client.id, rando, rating);

            })
         }
      },(error) => {
         console.log("No data?")
      });

   }

   getClient(data) {
      return data.map(e => {
         return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
         } as UserMatch;
      })
   }

   goToHome() {
      this.router.navigate(['/home', { mid: this.mid}]);
   }



    async showMessage(header: string, message: string) {

      const alert = await this.alertCtrl.create({
          header: header,
          message: message,
          buttons: [{text:'Ok',cssClass: 'secondary'}],
          cssClass: 'xxx',
      });

      // const toast = await this.toastController.create({
      //   message: message,
      //   duration: 3000,
      //   color: "primary",
      //   position: "middle",
      // });
      //toast.present();

      //USE THIS FOR AN ALERT INSTEAD OF A TOAST
      return await alert.present();

    }

}
