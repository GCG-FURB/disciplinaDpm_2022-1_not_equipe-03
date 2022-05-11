import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitTypeService {

  constructor(
    private http: HttpClient
  ) { }

  public get(id: string) {
    return this.http.get<VisitTypeModel>(`${environment.urlBackend}/lobby-api/visit-type/${id}`);
  }

  public list() {
    return this.http.get<VisitTypeModel[]>(`${environment.urlBackend}/lobby-api/visit-type`);
  }

  public insert(entity: VisitTypeModel) {
    delete entity.id;
    return this.http.post<VisitTypeModel>(`${environment.urlBackend}/lobby-api/visit-type`, entity);
  }

  public update(id: string, entity: VisitTypeModel) {
    delete entity.id;
    return this.http.put<VisitTypeModel>(`${environment.urlBackend}/lobby-api/visit-type/${id}`, entity);
  }

  public delete(id: string) {
    return this.http.delete(`${environment.urlBackend}/lobby-api/visit-type/${id}`);
  }
}

export interface VisitTypeModel {
  id?: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: string;
}