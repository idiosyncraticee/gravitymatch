import { Component } from '@angular/core';
import { User, MyfirestoreService } from '../services/myfirestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

   constructor(
      //private modalCtrl:ModalController,
      //private alertCtrl:AlertController,
      private myfirestoreService: MyfirestoreService,

   ) {}

   ngOnInit() {

   }

}
