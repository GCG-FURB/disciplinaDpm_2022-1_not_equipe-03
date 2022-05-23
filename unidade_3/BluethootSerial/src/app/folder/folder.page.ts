import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, private bluetoothSerial: BluetoothSerial) { // Write a string
    //cordova.require('cordova/channel').onNativeReady.fire();

    this.bluetoothSerial.write('hello world');
    
    // Array of int or bytes
    this.bluetoothSerial.write([186, 220, 222]);
    
    // Typed Array
    var data = new Uint8Array(4);
    data[0] = 0x41;
    data[1] = 0x42;
    data[2] = 0x43;
    data[3] = 0x44;
    this.bluetoothSerial.write(data);
    
    // Array Buffer
    this.bluetoothSerial.write(data.buffer);
    
    bluetoothSerial.connect('localhost');
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
