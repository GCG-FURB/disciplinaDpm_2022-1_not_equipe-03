import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(
    private http: HttpClient
  ) { }

  public get(id: string) {
    return this.http.get<VisitModel>(`${environment.urlBackend}/lobby-api/visit/${id}`);
  }

  public list() {
    return this.http.get<VisitModel[]>(`${environment.urlBackend}/lobby-api/visit`);
  }

  public insert(entity: VisitModel) {
    delete entity.id;
    return this.http.post<VisitModel>(`${environment.urlBackend}/lobby-api/visit`, entity);
  }

  public update(id: string, entity: VisitModel) {
    delete entity.id;
    return this.http.put<VisitModel>(`${environment.urlBackend}/lobby-api/visit/${id}`, entity);
  }

  public delete(id: string) {
    return this.http.delete(`${environment.urlBackend}/lobby-api/visit/${id}`);
  }
}

export interface VisitModel {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  street?: string;
  number?: string;
  district?: string;
  city?: string;
  province?: string;
  country?: string;
  createdAt?: Date;
  updatedAt?: string;
}
