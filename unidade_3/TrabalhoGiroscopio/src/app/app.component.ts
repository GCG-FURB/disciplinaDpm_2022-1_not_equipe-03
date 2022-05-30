import { AfterViewInit, Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { InputsComponent } from './shared/inputs/inputs.component';

declare var google;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  public lat = 0;
  public long = 0;
  public map;

  constructor(private geolocation: Geolocation, private modalController: ModalController) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      google.maps.event.addDomListener(window, "load", () => {
        const lats = 53.430967;
        const longs = -2.960835;
        var mapProp = {
          center: new google.maps.LatLng(lats, longs),
          zoom: 20,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        this.getCurrentCoordinates();
      });
    });
  }

  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      maximumAge: 3600,
      timeout: 30000
    }).then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
      this.map.setCenter(new google.maps.LatLng(this.lat, this.long));
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  public async showInputs() {
    const modal = await this.modalController.create({
      component: InputsComponent,
      mode: 'ios',
      componentProps: {
        lat: this.lat,
        long: this.long
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
