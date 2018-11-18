import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PromptMatchmakingPage } from './prompt-matchmaking.page';

const routes: Routes = [
  {
    path: '',
    component: PromptMatchmakingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PromptMatchmakingPage]
})
export class PromptMatchmakingPageModule {}
