import { Component, OnInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { User, MyfirestoreService } from '../services/myfirestore.service';

@Component({
   selector: 'app-client-profile',
   templateUrl: './client-profile.page.html',
   styleUrls: ['./client-profile.page.scss'],
})
export class ClientProfilePage implements OnInit {

   clients: User[];
   client: User;

   constructor(
      private nav:NavController,
      private modalCtrl:ModalController,
      public toastController: ToastController,
      private myfirestoreService: MyfirestoreService,
   ) { }

   ngOnInit() {
      // this.clients =   [
      //    { name: "Ryan", location: "Spokane, WA", mm: '12', rank: "8", show: "yes", headshot1: "./assets/Ryan Arnold.png",headshot2: "./assets/Ryan Arnold.png",headshot3: "./assets/Ryan Arnold.png", description: "Once got three pop-tarts in a single package" },
      //    { name: "Pat", location: "Spokane, WA", mm: '12', rank: "10", show: "yes", headshot1: "./assets/Pat Atwal.png",headshot2: "./assets/Pat Atwal.png",headshot3: "./assets/Pat Atwal.png", description: "Extraordinarily fast rapper" },
      //    { name: "Nadine", location: "Spokane, WA", mm: '12', rank: "6", show: "yes", headshot1: "./assets/Nadine Burgess.png",headshot2: "./assets/Nadine Burgess.png",headshot3: "./assets/Nadine Burgess.png", description: "Proud owner of industrial-strength dog washer" },
      //    { name: "Chip", location: "Spokane, WA", mm: '12', rank: "7", show: "yes", headshot1: "./assets/Chip Overstreet.png",headshot2: "./assets/Chip Overstreet.png",headshot3: "./assets/Chip Overstreet.png", description: "Honest, trustworthy and a great liar" },
      //    { name: "Steve", location: "Spokane, WA", mm: '12', rank: "8", show: "yes", headshot1: "./assets/Steve Trabun.png",headshot2: "./assets/.Steve Trabun.png",headshot3: "./assets/Steve Trabun.png", description: "Thinks chickens aren't real" },
      //
      // ];

      this.myfirestoreService.getClients().subscribe(data => {
         this.clients = data.map(e => {
            return {
               id: e.payload.doc.id,
               ...e.payload.doc.data()
            } as User;
         })
      });

   }


   ionViewDidEnter() {
      console.log("ionViewDidEnter");

      var random_client = Math.floor(Math.random() * this.clients.length);
      this.client = this.clients[random_client];
      

      //this.presentToastWithOptions(this.client.name);
   }

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

   async presentToastWithOptions(name) {
      const toast = await this.toastController.create({
         message: 'The name is '+name,
         showCloseButton: false,
         position: 'middle',
         duration: 2000
      });
      toast.present();
   }

}
