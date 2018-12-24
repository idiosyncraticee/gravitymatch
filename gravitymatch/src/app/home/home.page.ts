import { Component } from '@angular/core';
import { User, MyfirestoreService } from '../services/myfirestore.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController,ModalController } from '@ionic/angular';

@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
})
export class HomePage {

   matchmaker_data:User;
   mid: string;

   constructor(
      //private modalCtrl:ModalController,
      private alertCtrl:AlertController,
      private router: Router,
      private route: ActivatedRoute,
      private myfirestoreService: MyfirestoreService,
      private afAuth: AngularFireAuth,
      private authService: AuthenticationService,
   ) {}

   ngOnInit() {
      console.log("Home:ngOnInit")

   }

   ionViewDidLoad() {
      console.log("Home:ionViewDidLoad")
   }

   ionViewDidEnter() {
      console.log("Home:ionViewDidEnter")
      this.mid = this.route.snapshot.paramMap.get('mid');

      if(this.mid==null) {
         this.router.navigate(['/onboarding']);
         console.log("I should be headed to onboarding now");
      }

      console.log("this.mid: "+this.mid);

      this.myfirestoreService.getMatchmakerData(this.mid).subscribe(data => {
         var matchmaker_data_array = data.map(m => {
            console.log(m)
            return {
             id: m.payload.doc.id,
             ...m.payload.doc.data()
          } as User;
         });
         this.matchmaker_data = matchmaker_data_array[0];

      });
   }

   goToMatchGame() {
      this.myfirestoreService.getRandomUser().then((cid) => {
         this.mid = this.route.snapshot.paramMap.get('mid');
         console.log("Home:goToMatchGame");
         console.log(cid);

         this.router.navigate(['/match_game', { mid: this.mid, cid: cid}]);
      })

   }

   checkMatchScore() {
      this.showAlert("Locked", "You need a MatchScore of 500 in order to unlock your matches");
   }

   async showAlert(header: string, message: string) {

      const alert = await this.alertCtrl.create({
         header: header,
         message: message,
         buttons: [{text:'Ok',cssClass: 'secondary'}],
         cssClass: 'xxx',
      });
      return await alert.present();
   }

}
