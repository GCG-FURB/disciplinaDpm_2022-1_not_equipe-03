import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitPageRoutingModule } from './visit-routing.module';

import { VisitPage } from './visit.page';
import { TableModule } from 'primeng/table';
import { FormatDatePipe } from '../pipe/format-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitPageRoutingModule,
    TableModule
  ],
  declarations: [VisitPage, FormatDatePipe]
})
export class VisitPageModule { }
