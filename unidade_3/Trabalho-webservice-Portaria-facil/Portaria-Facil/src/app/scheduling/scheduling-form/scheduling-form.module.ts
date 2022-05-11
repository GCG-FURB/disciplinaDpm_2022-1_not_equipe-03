import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulingFormPageRoutingModule } from './scheduling-form-routing.module';

import { SchedulingFormPage } from './scheduling-form.page';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulingFormPageRoutingModule,
    ReactiveFormsModule,
    CalendarModule
  ],
  declarations: [SchedulingFormPage]
})
export class SchedulingFormPageModule { }
