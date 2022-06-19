import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { AppStorageService } from 'src/app/core/app-storage/app-storage.service';
import { UserService } from 'src/app/core/entities/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public image = 'assets/image/portaria-facil.PNG';
  public logo = 'assets/image/portaria-facil.PNG';

  public form: FormGroup;
  public loading = false;
  public showPerson = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastController: ToastController,
    private appStorageService: AppStorageService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.getFormGroup();
  }

  private getFormGroup() {
    return this.formBuilder.group({
      email: [{ value: undefined, disabled: false }, Validators.compose([Validators.required, Validators.maxLength(100)])],
      password: [{ value: undefined, disabled: false }, Validators.compose([Validators.required, Validators.maxLength(20)])],
    });
  }

  public onClickEye() {
    this.showPerson = !this.showPerson;
  }

  public async login() {
    this.loading = true;
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    try {
      const token = await this.userService.login(this.form.getRawValue()).toPromise();
      this.appStorageService.setToken(token.authorization);
      this.router.navigate(['/', 'scheduling']);
    } catch (err) {
      console.log(err);
      const toast = await this.toastController.create({
        message: err.error.message,
        duration: 2000,
        color: 'danger', position: 'top'
      });
      toast.present();
    }
    this.loading = false;

  }
}
