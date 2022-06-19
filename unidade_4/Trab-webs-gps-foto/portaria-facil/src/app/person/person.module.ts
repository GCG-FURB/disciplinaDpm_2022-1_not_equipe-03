import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TableModule } from 'primeng/table';

import { PersonPageRoutingModule } from './person-routing.module';
import { PersonPage } from './person.page';
import { PhotoModule } from '../photo/photo/photo.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonPageRoutingModule,
    TableModule
  ],
  declarations: [PersonPage]
})
export class PersonPageModule {}
