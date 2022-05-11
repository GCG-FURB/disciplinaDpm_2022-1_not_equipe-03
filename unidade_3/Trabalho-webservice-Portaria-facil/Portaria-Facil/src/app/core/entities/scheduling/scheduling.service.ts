import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  constructor(
    private http: HttpClient
  ) { }

  public get(id: string) {
    return this.http.get<SchedulingModel>(`${environment.urlBackend}/lobby-api/scheduling/${id}`);
  }

  public list() {
    return this.http.get<SchedulingModel[]>(`${environment.urlBackend}/lobby-api/scheduling`);
  }

  public insert(entity: SchedulingModel) {
    delete entity.id;
    return this.http.post<SchedulingModel>(`${environment.urlBackend}/lobby-api/scheduling`, entity);
  }

  public update(id: string, entity: SchedulingModel) {
    delete entity.id;
    return this.http.put<SchedulingModel>(`${environment.urlBackend}/lobby-api/scheduling/${id}`, entity);
  }

  public delete(id: string) {
    return this.http.delete(`${environment.urlBackend}/lobby-api/scheduling/${id}`);
  }
}

export interface SchedulingModel {
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