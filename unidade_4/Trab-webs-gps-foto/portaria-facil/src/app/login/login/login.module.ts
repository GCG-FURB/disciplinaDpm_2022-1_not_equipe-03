import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginComponentRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    LoginComponentRoutingModule,
    ReactiveFormsModule,
    IonicModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {}
