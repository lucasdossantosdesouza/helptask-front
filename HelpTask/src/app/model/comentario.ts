import { Usuario } from './usuario';
import { Task } from './task';
export class Comentario {
    public id: string;
    public texto: string;
    public task: Task;
    public usuario: Usuario;
    public data:string;
}
