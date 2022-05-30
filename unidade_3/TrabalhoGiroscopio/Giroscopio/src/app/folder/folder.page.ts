import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, private gyroscope: Gyroscope) { 

    let options: GyroscopeOptions = {
      frequency: 1000
   }
   
   this.gyroscope.getCurrent(options)
     .then((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
      })
     .catch()
   
   
   this.gyroscope.watch()
      .subscribe((orientation: GyroscopeOrientation) => {
         console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
      });
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  
}

