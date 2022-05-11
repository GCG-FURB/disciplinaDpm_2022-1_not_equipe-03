import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(
    private http: HttpClient
  ) { }

  public get(id: string) {
    return this.http.get<LobbyModel>(`${environment.urlBackend}/lobby-api/lobby/${id}`);
  }

  public list() {
    return this.http.get<LobbyModel[]>(`${environment.urlBackend}/lobby-api/lobby`);
  }

  public insert(entity: LobbyModel) {
    delete entity.id;
    return this.http.post<LobbyModel>(`${environment.urlBackend}/lobby-api/lobby`, entity);
  }

  public update(id: string, entity: LobbyModel) {
    delete entity.id;
    return this.http.put<LobbyModel>(`${environment.urlBackend}/lobby-api/lobby/${id}`, entity);
  }

  public delete(id: string) {
    return this.http.delete(`${environment.urlBackend}/lobby-api/lobby/${id}`);
  }
}

export interface LobbyModel {
  id?: string;
  firstName: string;
  activeLobby: boolean;
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
