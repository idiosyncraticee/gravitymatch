import { Component, OnInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.page.html',
  styleUrls: ['./client-profile.page.scss'],
})
export class ClientProfilePage implements OnInit {

   private clients:any;
   public client:any;
  constructor(private nav:NavController,private modalCtrl:ModalController) { }

  ngOnInit() {
     this.clients =   [
       { name: "Ryan", location: "Spokane, WA", mm: '12', rank: "8", show: "yes", headshot1: "./assets/Ryan Arnold.png",headshot2: "./assets/Ryan Arnold.png",headshot3: "./assets/Ryan Arnold.png", description: "Once got three pop-tarts in a single package" },
         { name: "Pat", location: "Spokane, WA", mm: '12', rank: "10", show: "yes", headshot1: "./assets/Pat Atwal.png",headshot2: "./assets/Pat Atwal.png",headshot3: "./assets/Pat Atwal.png", description: "Extraordinarily fast rapper" },
              { name: "Nadine", location: "Spokane, WA", mm: '12', rank: "6", show: "yes", headshot1: "./assets/Nadine Burgess.png",headshot2: "./assets/Nadine Burgess.png",headshot3: "./assets/Nadine Burgess.png", description: "Proud owner of industrial-strength dog washer" },
                   { name: "Chip", location: "Spokane, WA", mm: '12', rank: "7", show: "yes", headshot1: "./assets/Chip Overstreet.png",headshot2: "./assets/Chip Overstreet.png",headshot3: "./assets/Chip Overstreet.png", description: "Honest, trustworthy and a great liar" },
                        { name: "Steve", location: "Spokane, WA", mm: '12', rank: "8", show: "yes", headshot1: "./assets/Steve Trabun.png",headshot2: "./assets/.Steve Trabun.png",headshot3: "./assets/Steve Trabun.png", description: "Thinks chickens aren't real" },

     ];

     this.client = this.clients[0];
  }

  ionViewDidEnter() {
     console.log("ionViewDidEnter");


     //TODO: MAKE A RANDOM NUMBER
     this.client = this.clients[0];
     console.log(this.client);
  }
  
  closeModal()
  {
    this.modalCtrl.dismiss();
  }

}
