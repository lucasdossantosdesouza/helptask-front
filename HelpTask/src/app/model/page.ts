import { Usuario } from 'src/app/model/usuario';
export class Page {
    content: Array<Usuario>;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort?: any;
    numberOfElements: number;
    first: boolean;
}
