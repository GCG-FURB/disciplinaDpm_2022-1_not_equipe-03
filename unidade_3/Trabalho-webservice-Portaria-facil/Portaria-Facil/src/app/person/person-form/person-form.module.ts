import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonFormPageRoutingModule } from './person-form-routing.module';

import { PersonFormPage } from './person-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PersonFormPage]
})
export class PersonFormPageModule {}
