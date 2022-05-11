import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { VisitModel, VisitService } from '../core/entities/visit/visit.service';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.page.html',
  styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {

  public visit: VisitModel[];


  constructor(
    private visitService: VisitService,
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
    this.visitService.list()
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe(visit => {
        this.visit = visit;
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
              await this.visitService.delete(id).toPromise();
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
