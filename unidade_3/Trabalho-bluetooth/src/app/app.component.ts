import { Component, OnInit } from '@angular/core';
import { BluetoothLE } from '@awesome-cordova-plugins/bluetooth-le/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private bluetoothSerial: BluetoothLE,
    private platform: Platform
  ) { }

  ngOnInit(): void {
    this.platform.ready().then(() => {
      this.bluetoothSerial.initialize().subscribe(ble => {
        console.log('ble', ble.status);
      });
    });
  }

  public async update() {
    console.log('tryng');
    try {
      const item = await this.bluetoothSerial.startScan({
        allowDuplicates: true
      }).subscribe(e => {
        console.log(e);
      }, err => {
        console.log(err);
      });
      console.log(item);

    } catch (err) {
      console.log(err);

    }

  }
}
