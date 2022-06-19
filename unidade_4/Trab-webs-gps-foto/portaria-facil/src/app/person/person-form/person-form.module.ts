import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonFormPageRoutingModule } from './person-form-routing.module';

import { PersonFormPage } from './person-form.page';
import { PhotoModule } from 'src/app/photo/photo/photo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonFormPageRoutingModule,
    ReactiveFormsModule,
    PhotoModule
  ],
  declarations: [PersonFormPage]
})
export class PersonFormPageModule {}
