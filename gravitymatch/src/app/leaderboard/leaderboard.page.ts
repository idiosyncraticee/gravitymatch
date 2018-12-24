import { Component, OnInit } from '@angular/core';
import { User, MyfirestoreService } from '../services/myfirestore.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {

   leaderboard_data:User[];

  constructor(
           private myfirestoreService: MyfirestoreService,
      ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
     console.log("Leaderboard:ionViewDidEnter")

     this.myfirestoreService.getLeaderboardData().subscribe(data => {
        var leaderboard_data_array = data.map(m => {
           console.log(m)
           return {
           id: m.payload.doc.id,
           ...m.payload.doc.data()
         } as User;
        });

        this.leaderboard_data = leaderboard_data_array.filter(item => item);

     },(error) => {
        console.log("Error in leaderboard ngOnInit");
     },() => {
        console.log("Complete!")
     });
  }

}
