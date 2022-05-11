import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LobbyFormPageRoutingModule } from './lobby-form-routing.module';

import { LobbyFormPage } from './lobby-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LobbyFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LobbyFormPage]
})
export class LobbyFormPageModule {}
