import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { VisitService } from 'src/app/core/entities/visit/visit.service';

@Component({
  selector: 'app-visit-form',
  templateUrl: './visit-form.page.html',
  styleUrls: ['./visit-form.page.scss'],
})
export class VisitFormPage implements OnInit {

  public form: FormGroup;

  constructor(
    private visitService: VisitService,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      street: [null],
      number: [null],
      district: [null],
      city: [null],
      province: [null],
      country: [null]
    });
  }

  ionViewWillEnter() {
    if (this.activatedRoute.snapshot.data.visit) {
      this.form.patchValue(this.activatedRoute.snapshot.data.visit);
    }
  }

  public isNew() {
    return !this.form.get('id').value;
  }

  public async salvar() {
    if (!this.form.valid) {
      const toast = await this.toastController.create({
        message: 'Preencha os campos obrigatórios',
        position: 'top',
        color: 'danger',
        duration: 3000,
        buttons: [{
          text: 'Ok',
          role: 'cancel',
        }]
      });
      toast.present();
      return this.form.markAllAsTouched();
    }
    const loading = await this.loadingController.create({ message: 'Aguarde...' });
    await loading.present();
    try {
      const value = this.form.getRawValue();
      if (this.isNew()) {
        await this.visitService.insert(value).toPromise();
      } else {
        await this.visitService.update(value.id, value).toPromise();
      }
      this.back();
    } catch (err) {

    }
    loading.dismiss();
  }

  public back() {
    this.navController.back();
  }
}
