import { HttpClient } from '@angular/common/http';
import { HELP_TASK_API } from './helptask.api';
import { Injectable } from '@angular/core';
import { Comentario } from '../model/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) { }

  createOrUpdate(comentario: Comentario){
    if(comentario.id != null && comentario.id != ''){
     return this.http.put(`${HELP_TASK_API}/api/comentario`,comentario);
    }else{
      comentario.id = null;
     return this.http.post(`${HELP_TASK_API}/api/comentario`,comentario);
    }
  }

  delete(id: string){
    return this.http.delete(`${HELP_TASK_API}/api/comentario/${id}`);
  }

  findByTaskId(page: number , count: number,idTask: string){
    return this.http.get(`${HELP_TASK_API}/api/comentario/${page}/${count}/${idTask}`);
  }
}
