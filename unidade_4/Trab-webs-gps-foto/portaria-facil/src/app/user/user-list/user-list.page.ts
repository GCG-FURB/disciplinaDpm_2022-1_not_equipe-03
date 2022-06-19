import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

import { finalize } from 'rxjs/operators';

import { UserModel, UserService } from 'src/app/core/entities/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  public users: UserModel[];

  constructor(
    private usersService: UserService,
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
    this.usersService.list()
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe(users => {
        this.users = users;
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
              await this.usersService.delete(id).toPromise();
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
