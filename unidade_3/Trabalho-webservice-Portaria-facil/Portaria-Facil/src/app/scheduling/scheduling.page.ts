import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { SchedulingModel, SchedulingService } from '../core/entities/scheduling/scheduling.service';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.page.html',
  styleUrls: ['./scheduling.page.scss'],
})
export class SchedulingPage implements OnInit {

  public scheduling: SchedulingModel[];

  constructor(
    private schedulingService: SchedulingService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.init();
  }

  public async init() {
    const loading = await this.loadingController.create({ message: 'Aguarde...' });
    await loading.present();
    this.schedulingService.list()
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe(scheduling => {
        this.scheduling = scheduling;
      });
  }

  public async remover(id: string) {
    const alert = await this.alertController.create({
      header: 'Remover',
      message: 'Deseja realmente remover este usuário?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Sim',
          id: 'confirm-button',
          handler: async () => {
            const loading = await this.loadingController.create({ message: 'Aguarde...' });
            await loading.present();
            try {
              await this.schedulingService.delete(id).toPromise();
            } catch (err) {}
            loading.dismiss();
            this.init();
          }
        }
      ]
    });

    await alert.present();
  }
}
