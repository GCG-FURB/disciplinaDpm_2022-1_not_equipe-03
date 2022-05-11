import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { SchedulingService } from 'src/app/core/entities/scheduling/scheduling.service';

@Component({
  selector: 'app-scheduling-form',
  templateUrl: './scheduling-form.page.html',
  styleUrls: ['./scheduling-form.page.scss'],
})
export class SchedulingFormPage implements OnInit {

  public form: FormGroup;
  public date: Date;
  public hours: Date;
  
  constructor(
    private schedulingService: SchedulingService,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [],
      visitReason: [null, Validators.required],
      visitType: [null, Validators.required],
      startDate: [null, Validators.required],
      startHour: [null, Validators.required],
      endDate: [null, Validators.required],
      endHour: [null, Validators.required],
      lobby: [null, Validators.required],
      visited: [null, Validators.required],
      visit: [null, Validators.required]
    });
  }

  ionViewWillEnter() {
    if (this.activatedRoute.snapshot.data.scheduling) {
      this.form.patchValue(this.activatedRoute.snapshot.data.scheduling);
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
        await this.schedulingService.insert(value).toPromise();
      } else {
        await this.schedulingService.update(value.id, value).toPromise();
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
