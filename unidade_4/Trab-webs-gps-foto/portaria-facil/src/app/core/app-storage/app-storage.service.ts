import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  private keyStorage = 'br.com.portaria.facil';


  constructor() { }

  public setToken(token: string) {
    localStorage.setItem(`${this.keyStorage}.token`, token);
  }

  public getToken(){
   return localStorage.getItem(`${this.keyStorage}.token`);
  }
}
