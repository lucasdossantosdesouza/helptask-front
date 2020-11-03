import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  confirm(message?: string){
    return new Promise(resolve =>{
      return resolve(window.confirm(message || 'confirma?'))
    })
  }
}
