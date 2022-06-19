import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LobbyPage } from './lobby.page';

const routes: Routes = [
  {
    path: '',
    component: LobbyPage
  },
  {
    path: 'lobby-form',
    loadChildren: () => import('./lobby-form/lobby-form.module').then( m => m.LobbyFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LobbyPageRoutingModule {}
