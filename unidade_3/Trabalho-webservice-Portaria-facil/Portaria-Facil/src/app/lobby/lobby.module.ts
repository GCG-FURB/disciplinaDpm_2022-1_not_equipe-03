import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LobbyPageRoutingModule } from './lobby-routing.module';

import { LobbyPage } from './lobby.page';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LobbyPageRoutingModule,
    TableModule
  ],
  declarations: [LobbyPage]
})
export class LobbyPageModule {}
