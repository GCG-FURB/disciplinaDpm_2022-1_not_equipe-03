import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { VisitTypeModel, VisitTypeService } from '../core/entities/visitType/visit-type.service';

@Component({
  selector: 'app-visit-type',
  templateUrl: './visit-type.page.html',
  styleUrls: ['./visit-type.page.scss'],
})
export class VisitTypePage implements OnInit {

  public visitType: VisitTypeModel[];

  constructor(
    private visitTypeService: VisitTypeService,
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
    this.visitTypeService.list()
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe(visitType => {
        this.visitType = visitType;
      });
  }

  public async remover(id: string) {
    const alert = await this.alertController.create({
      header: 'Remover',
      message: 'Deseja realmente remover este tipo de visita?',
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
              await this.visitTypeService.delete(id).toPromise();
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
