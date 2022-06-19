import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PersonService } from 'src/app/core/entities/person/person.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {

  @Output() photoId = new EventEmitter<string>();
  @ViewChild('file', { static: false }) file: ElementRef;

  public image = 'assets/image/user.png';
  public blob = null;

  constructor(
    private personService: PersonService,
    private http: HttpClient){

  }

  ngOnInit() { }

  public addPhotoToGallery() {
    this.file.nativeElement.click();
  }

  public async onChangePhoto(event) {
    this.blob = event.srcElement.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.blob);
    reader.onload = () => {
      this.image = reader.result as string;
    };
    try{
      const link = await this.personService.generateLink().toPromise();
       await this.http.put(link.url, this.blob).toPromise();
       this.photoId.emit(link.uuid);
    }catch(err){
      console.log(err);
    }
  }
}