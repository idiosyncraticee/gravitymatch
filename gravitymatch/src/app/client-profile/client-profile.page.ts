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
       { name: "Chip", location: "Spokane, WA", mm: '12', rank: "4", show: "yes", headshot1: "./assets/Chip Overstreet.png",headshot2: "./assets/Chip Overstreet.png",headshot3: "./assets/Chip Overstreet.png", description: "Masters Degree in Falconry Sciences" },
       { name: "Robbie", location: "22 miles", mm: '12', rank: "4", show: "yes" },
       { name: "Kyle", location: "22 miles", mm: '12', rank: "4", show: "yes" },
       { name: "Chris", location: "22 miles", mm: '12', rank: "4", show: "yes" },
       { name: "Patricia", location: "22 miles", mm: '12', rank: "4", show: "yes" },
       { name: "Joe", location: "22 miles", mm: '12', rank: "4", show: "yes" },
       { name: "Patrick", location: "22 miles", mm: '12', rank: "4", show: "yes" },
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
