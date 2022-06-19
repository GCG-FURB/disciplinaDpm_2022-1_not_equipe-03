import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitTypePageRoutingModule } from './visit-type-routing.module';

import { VisitTypePage } from './visit-type.page';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitTypePageRoutingModule,
    TableModule
  ],
  declarations: [VisitTypePage]
})
export class VisitTypePageModule {}
