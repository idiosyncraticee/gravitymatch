import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClientProfilePage } from '../client-profile/client-profile.page';

@Component({
  selector: 'app-match-game',
  templateUrl: './match-game.page.html',
  styleUrls: ['./match-game.page.scss'],
})
export class MatchGamePage implements OnInit {
   randos:any;
  constructor() { }

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

export class Modal {
   constructor(public modalController: ModalController) {}
 
   async presentModal() {
     const modal = await this.modalController.create({
       component: ClientProfilePage,
       componentProps: { value: 123 }
     });
     return await modal.present();
   }
 }