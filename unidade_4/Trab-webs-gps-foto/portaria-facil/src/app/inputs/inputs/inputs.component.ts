import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

declare var google;

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent implements OnInit {

  @Input() lat = 53.430967;
  @Input() long = -2.960835;

  public map;

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      var mapProp = {
        center: new google.maps.LatLng(this.lat, this.long),
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
      this.getCurrentCoordinates();
    }, 500)
  }

  getCurrentCoordinates() {
    this.map.setCenter(new google.maps.LatLng(this.lat, this.long));
  }

}
