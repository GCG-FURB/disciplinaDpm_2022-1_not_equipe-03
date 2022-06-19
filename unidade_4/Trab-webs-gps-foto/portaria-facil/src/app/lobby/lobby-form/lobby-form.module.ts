import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LobbyFormPageRoutingModule } from './lobby-form-routing.module';

import { LobbyFormPage } from './lobby-form.page';
import { InputsComponent } from 'src/app/inputs/inputs/inputs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LobbyFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LobbyFormPage, InputsComponent]
})
export class LobbyFormPageModule {}
