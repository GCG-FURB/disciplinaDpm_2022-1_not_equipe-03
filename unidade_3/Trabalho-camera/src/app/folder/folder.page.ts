import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {
  
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, public photoService: PhotoService) { 
    defineCustomElements(window);
  }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
  
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}




