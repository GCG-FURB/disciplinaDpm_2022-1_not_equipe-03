import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitTypeFormPageRoutingModule } from './visit-type-form-routing.module';

import { VisitTypeFormPage } from './visit-type-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitTypeFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VisitTypeFormPage]
})
export class VisitTypeFormPageModule {}
