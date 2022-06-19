import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { LobbyModel, LobbyService } from '../core/entities/lobby/lobby.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit {

  public lobby: LobbyModel[];

  constructor(
    private lobbyService: LobbyService,
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
    this.lobbyService.list()
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe(lobby => {
        this.lobby = lobby;
      });
  }

  public async remover(id: string) {
    const alert = await this.alertController.create({
      header: 'Remover',
      message: 'Deseja realmente remover esta portaria?',
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
              await this.lobbyService.delete(id).toPromise();
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
