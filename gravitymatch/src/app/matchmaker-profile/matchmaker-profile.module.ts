import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MatchmakerProfilePage } from './matchmaker-profile.page';

const routes: Routes = [
  {
    path: '',
    component: MatchmakerProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MatchmakerProfilePage]
})
export class MatchmakerProfilePageModule {}
