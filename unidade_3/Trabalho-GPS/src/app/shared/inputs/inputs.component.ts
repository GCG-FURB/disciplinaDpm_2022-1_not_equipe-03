import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent implements OnInit {

  @Input() lat = 0;
  @Input() long = 0;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  public save() {
    this.modalController.dismiss({
      lat: this.lat,
      long: this.long
    });
  }


  public resetSearch(){
    
  }
}
