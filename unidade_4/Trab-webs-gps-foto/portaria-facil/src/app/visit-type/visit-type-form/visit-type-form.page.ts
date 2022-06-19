import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { VisitTypeService } from 'src/app/core/entities/visitType/visit-type.service';

@Component({
  selector: 'app-visit-type-form',
  templateUrl: './visit-type-form.page.html',
  styleUrls: ['./visit-type-form.page.scss'],
})
export class VisitTypeFormPage implements OnInit {

  public form: FormGroup;

  constructor(
    private visitTypeService: VisitTypeService,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [],
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
  }
  ionViewWillEnter() {
    if (this.activatedRoute.snapshot.data.visitType) {
      this.form.patchValue(this.activatedRoute.snapshot.data.visitType);
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
        await this.visitTypeService.insert(value).toPromise();
      } else {
        await this.visitTypeService.update(value.id, value).toPromise();
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
