import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotoComponent } from './photo.component';



@NgModule({
  declarations: [PhotoComponent],
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    PhotoComponent
  ]
})
export class PhotoModule { }
