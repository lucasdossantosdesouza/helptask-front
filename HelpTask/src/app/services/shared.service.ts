import { Usuario } from './../model/usuario';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public static instance: SharedService = null;
  usuario: Usuario;
  token: string;
  showTemplate = new EventEmitter<boolean>();

  constructor() {
    return SharedService.instance = SharedService.instance || this;    
  }

  public static getInstance(){
    if(this.instance == null){
      this.instance = new SharedService();
    }
    return this.instance;
  }

  isLoggedIn():boolean{
    if(this.usuario == null){
        return false;
    }
    return this.usuario.email != '';    
  }
}
