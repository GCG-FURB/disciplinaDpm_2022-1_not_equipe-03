import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { LobbyService } from 'src/app/core/entities/lobby/lobby.service';
import { InputsComponent } from 'src/app/inputs/inputs/inputs.component';

declare var google;
@Component({
  selector: 'app-lobby-form',
  templateUrl: './lobby-form.page.html',
  styleUrls: ['./lobby-form.page.scss'],
})
export class LobbyFormPage implements OnInit {

  public lat = 0;
  public long = 0;
  public map;
  public form: FormGroup;

  constructor(
    private lobbyService: LobbyService,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [],
      name: [null, Validators.required],
      activeLobby: [null],
      physicalLocation: [null, Validators.required],
      latitude: [null],
      longitude: [null]
    });
  }

  ionViewWillEnter() {
    if (this.activatedRoute.snapshot.data.lobby) {
      this.form.patchValue(this.activatedRoute.snapshot.data.lobby);
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
        await this.lobbyService.insert(value).toPromise();
      } else {
        await this.lobbyService.update(value.id, value).toPromise();
      }
      this.back();
    } catch (err) {

    }
    loading.dismiss();
  }

  public back() {
    this.navController.back();
  }

  public save() {
    this.modalController.dismiss({
      lat: this.lat,
      long: this.long
    });
  }

  ngAfterViewInit(): void {
  }

  public async showInputs() {
    const modal = await this.modalController.create({
      component: InputsComponent,
      mode: 'ios',
      componentProps: {
        lat: this.form.get('latitude').value,
        long: this.form.get('longitude').value
      },
      cssClass: 'quick-select'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.lat = data.lat;
      this.long = data.long;
      this.map.setCenter(new google.maps.LatLng(this.lat, this.long));
    }
  }
}
