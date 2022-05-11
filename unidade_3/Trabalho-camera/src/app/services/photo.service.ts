import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  public photos: UserPhoto[] = [];
  
  public async addNewToGallery() {
    console.log(this.photos.length);
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  
    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath
    });
    console.log(this.photos.length);
  }

  constructor() { }
}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}









