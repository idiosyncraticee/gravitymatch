import { Component, OnInit } from '@angular/core';
//import { SentimentAnalysisService } from './sentiment-analysis.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  //constructor(sentimentAnalysisService:SentimentAnalysisService,) { }
  constructor() { }
  ngOnInit() {
  }

  ionViewDidEnter() {
     // this.sentimentAnalysisService.searchByYear(year).then(res => {
     //    if (res) {
     //       if (from == 'editLoadAll' || from == 'indLoad' || from == 'vin') this.events.publish('vehicle:dismissLoading', from); // Hide spinner
     //       res.forEach(result => this.makeLists.push({ key: result.text, value: result.value })); // Make list
     //       this.events.publish('makeLists', { year: year, options: this.makeLists }); // Populate model option list
     //       resolve();
     //    }
     // },err => this.callBackErr(err, from));
 }
}
