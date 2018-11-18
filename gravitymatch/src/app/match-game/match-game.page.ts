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
   constructor( private modalCtrl:ModalController,private alertCtrl:AlertController) {}
   async openModal()
   {
     const modal = await this.modalCtrl.create({
      component: ClientProfilePage
    });
 
    return await modal.present();
   }

  ngOnInit() {
  }
  ionViewDidEnter() {
     console.log("ionViewDidEnter");
     this.randos =   [
        { name: "Ryan", location: "22 miles", mm: '12', rank: "4", show: "yes" },
        { name: "Robbie", location: "22 miles", mm: '12', rank: "4", show: "yes" },
        { name: "Kyle", location: "22 miles", mm: '12', rank: "4", show: "yes" },
        { name: "Chris", location: "22 miles", mm: '12', rank: "4", show: "yes", description: "Saltwater aquarium enthusiast ... nay, zealot." },
        { name: "Patricia", location: "22 miles", mm: '12', rank: "4", show: "yes" },
        { name: "Joe", location: "22 miles", mm: '12', rank: "4", show: "yes" },
        { name: "Patrick", location: "22 miles", mm: '12', rank: "4", show: "yes" },
     ];
  }

  star() {
     console.log("Star Power!");
 }
}

