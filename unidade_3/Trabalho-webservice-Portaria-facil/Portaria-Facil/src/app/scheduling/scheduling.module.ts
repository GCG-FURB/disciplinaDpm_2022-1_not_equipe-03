import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulingPageRoutingModule } from './scheduling-routing.module';

import { SchedulingPage } from './scheduling.page';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulingPageRoutingModule,
    TableModule,
    CalendarModule
  ],
  declarations: [SchedulingPage]
})
export class SchedulingPageModule {}
