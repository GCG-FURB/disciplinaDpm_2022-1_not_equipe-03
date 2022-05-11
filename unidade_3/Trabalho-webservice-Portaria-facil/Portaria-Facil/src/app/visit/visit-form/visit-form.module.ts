import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitFormPageRoutingModule } from './visit-form-routing.module';

import { VisitFormPage } from './visit-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VisitFormPage]
})
export class VisitFormPageModule {}
