import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'new_account', loadChildren: './new-account/new-account.module#NewAccountPageModule' },
  { path: 'my_matches', loadChildren: './my-matches/my-matches.module#MyMatchesPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'chat_list', loadChildren: './chat-list/chat-list.module#ChatListPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'match_game', loadChildren: './match-game/match-game.module#MatchGamePageModule' },
  { path: 'matchmaker_profile', loadChildren: './matchmaker-profile/matchmaker-profile.module#MatchmakerProfilePageModule' },
  { path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesPageModule' },
  { path: 'client_profile', loadChildren: './client-profile/client-profile.module#ClientProfilePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
