import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { PersonModel, PersonService } from '../core/entities/person/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {

  public people: PersonModel[];

  constructor(
    private peopleService: PersonService,
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
    this.peopleService.list()
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe(people => {
        this.people = people;
      });
  }

  public async remover(id: string) {
    const alert = await this.alertController.create({
      header: 'Remover',
      message: 'Deseja realmente remover essa pessoa?',
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
              await this.peopleService.delete(id).toPromise();
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
