import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonPageRoutingModule } from './person-routing.module';

import { PersonPage } from './person.page';
import { TableModule } from 'primeng/table';

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
