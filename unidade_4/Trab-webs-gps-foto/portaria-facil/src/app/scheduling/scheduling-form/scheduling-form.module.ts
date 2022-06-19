import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulingFormPageRoutingModule } from './scheduling-form-routing.module';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { SchedulingFormPage } from './scheduling-form.page';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulingFormPageRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    AutoCompleteModule
  ],
  declarations: [SchedulingFormPage]
})
export class SchedulingFormPageModule { }
