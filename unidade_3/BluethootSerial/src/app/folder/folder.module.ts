import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';

import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,

  ],
  declarations: [FolderPage],

  providers: [
    BluetoothSerial
  ]
})
export class FolderPageModule {}
