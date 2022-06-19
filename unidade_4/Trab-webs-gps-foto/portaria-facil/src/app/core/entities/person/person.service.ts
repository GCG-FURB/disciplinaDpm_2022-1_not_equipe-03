import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private http: HttpClient
  ) { }

  public get(id: string) {
    return this.http.get<PersonModel>(`${environment.urlBackend}/lobby-api/people/${id}`);
  }

  public list() {
    return this.http.get<PersonModel[]>(`${environment.urlBackend}/lobby-api/people`);
  }

  public insert(entity: PersonModel) {
    delete entity.id;
    return this.http.post<PersonModel>(`${environment.urlBackend}/lobby-api/people`, entity);
  }

  public generateLink() {
    return this.http.post<GenerateLink>(`${environment.urlBackend}/lobby-api/generate-link`,{});
  }

  public update(id: string, entity: PersonModel) {
    delete entity.id;
    return this.http.put<PersonModel>(`${environment.urlBackend}/lobby-api/people/${id}`, entity);
  }

  public delete(id: string) {
    return this.http.delete(`${environment.urlBackend}/lobby-api/people/${id}`);
  }
}

export interface PersonModel {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street?: string;
  number?: string;
  district?: string;
  city?: string;
  province?: string;
  country?: string;
  createdAt?: Date;
  updatedAt?: string;
}

export interface GenerateLink {
  uuid: string;
  url: string;
}
