import { AlertService } from './../../_alert/alert.service';
import { DialogService } from './../../services/dialog.service';
import { Page } from './../../model/page';
import { ResponseApi } from './../../model/response-api';
import { Usuario } from 'src/app/model/usuario';
import { SharedService } from 'src/app/services/shared.service';
import {  Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  shared:SharedService;
  usuarios:Array<Usuario>; 
  paginas:Array<number>; 
  page: Page;
  count:number = 5;
  pag:number = 0;

  constructor(private usuarioService: UsuarioService,
    private router:Router,private dialogService: DialogService, 
    public alertService: AlertService) { 
    this.shared = SharedService.getInstance();
  }

  ngOnInit(): void {
    this.findAll(this.pag, this.count);
  }

  findAll(page: number, count: number){   
    this.usuarioService.findAll(page,count).subscribe((responseApi: ResponseApi)=>{
      this.usuarios = responseApi.data.content;
      this.page = responseApi.data;
      this.paginas = [this.page.totalPages];
    }, error=>{
      this.alertService.error(error['error']['errors'][0],{ id: 'alert-1' });     

    }     
    );
  }
  edit(id: string){
      this.router.navigate(['/novo-usuario',id]);
  }

  delete(id: string){
    this.dialogService.confirm('Deseja Realmente excluir usuário')
    .then((candelete: boolean)=>{
      if(candelete){
        this.usuarioService.delete(id).subscribe((responseApi: ResponseApi)=>{
          this.alertService.success('Usuário Excluido com sucesso',{ id: 'alert-1' });
          setTimeout(() => {
            this.alertService.clear('alert-1');           
            this.router.navigate(['/lista-usuario']);
          }, 4000);
          this.findAll(this.pag,this.count)
        }, error=>{
          this.alertService.error(error['error']['errors'][0],{ id: 'alert-1' });     

        }     
        );
      }
    })    
  }   

  changePage(event) {
    this.findAll(event.page, event.size);
  }
  
  setNextPage(event: any){
    event.preventDefault();
    if(this.pag+1 < this.paginas.length){
      this.pag = this.pag + 1;
    }
    this.findAll(this.pag, this.count);
  }

  setPreviousPage(event: any){
    event.preventDefault();
    if(this.pag >0){
      this.pag = this.pag - 1;
    }
    this.findAll(this.pag, this.count);
  }

  setPage(i: any, event: any){
    event.preventDefault();   
    this.pag = i;   
    this.findAll(this.pag, this.count);
  }

}
