import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public get(id: string) {
    return this.http.get<UserModel>(`${environment.urlBackend}/lobby-api/users/${id}`);
  }

  public list() {
    return this.http.get<UserModel[]>(`${environment.urlBackend}/lobby-api/users`);
  }

  public insert(entity: UserModel) {
    delete entity.id;
    return this.http.post<UserModel>(`${environment.urlBackend}/lobby-api/users`, entity);
  }

  public update(id: string, entity: UserModel) {
    delete entity.id;
    return this.http.put<UserModel>(`${environment.urlBackend}/lobby-api/users/${id}`, entity);
  }

  public delete(id: string) {
    return this.http.delete(`${environment.urlBackend}/lobby-api/users/${id}`);
  }
}

export interface UserModel {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: string;
}
