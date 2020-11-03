import { Comentario } from './comentario';
import { ChangeStatus } from './change-status';
import { Usuario } from './usuario';
import { Time } from '@angular/common';

export class Task {
    public id: string;
    public number: number;
    public titulo: string;
    public status: string;
    public priority: string;
    public image: any;
    public usuario: Usuario;
    public assigneredUser:Usuario;
    public data: string;
    public description: string;
    public changeStatus: Array<ChangeStatus>;
    public comentarios: Array<Comentario>;
    public dataAgendamento:Date;
    public tempoGasto: String;

   constructor(){
       
   }
   
}
