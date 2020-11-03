import { DialogService } from './../../services/dialog.service';
import { Page } from './../../model/page';
import { ResponseApi } from './../../model/response-api';
import { AlertService } from './../../_alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComentarioService } from './../../services/comentario.service';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/model/comentario';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {
  shared:SharedService;
  comentarios = new Array<Comentario>();
  idTask: string;
  page: Page;
  comentario = new Comentario();
  salvar: boolean = false;
 
  constructor(private comentarioService: ComentarioService, private router: ActivatedRoute
    ,public alertService: AlertService,private route:Router,private dialogService: DialogService) {
      this.shared = SharedService.getInstance();
    }

  ngOnInit(): void {
    this.idTask = this.router.snapshot.params['id'];    
    this.findByTask(0,5);
  }

  findByTask(page: number, count: number){   
    this.comentarioService.findByTaskId(page, count, this.idTask).subscribe((responseApi: ResponseApi)=>{
      this.comentarios = responseApi.data.content;     
      this.page = responseApi.data;
    }, error=>{
      this.alertService.error(error['error']['errors'][0],{ id: 'alert-1' });   

    }     
    );
  }
  registrar(){  
    this.comentario.task = new Task();
    this.comentario.task.id = this.idTask;
    this.comentarioService.createOrUpdate(this.comentario).subscribe(
      (responseApi: ResponseApi)=>{          
          let comentarioRet: Comentario = responseApi.data;
          this.alertService.success('Comentário salvo com sucesso ',
          { id: 'alert-1' });
          setTimeout(() => {
            this.alertService.clear('alert-1');            
            this.clean();
            this.route.navigate(['/comentario-task',this.idTask]);
          }, 4000);
           
    });
  } 
  delete(id: string){
    this.dialogService.confirm('Deseja Realmente excluir o comentário')
    .then((candelete: boolean)=>{
      if(candelete){
        this.comentarioService.delete(id).subscribe((responseApi: ResponseApi)=>{
          this.alertService.success('Comentário Excluida com sucesso',{ id: 'alert-1' });
          setTimeout(() => {
            this.alertService.clear('alert-1');            
            this.clean();
            this.route.navigate(['/comentario-task',this.idTask]);
          }, 4000);
        }, error=>{
          this.alertService.error(error['error']['errors'][0],{ id: 'alert-1' });     

        }     
        );
      }
    })    
  }   

  edit(item: Comentario){
    if(item.usuario.email == this.shared.usuario.email){
      this.comentario = item;
      this.salvar = false;
    }
  }
  visualizar(item: Comentario){    
    if(item.usuario.email == this.shared.usuario.email){
      this.comentario = item;
      this.salvar = false;
    }else{
      this.comentario = item;
      this.salvar = true;    
    }
  }
  
  clean(){
    this.findByTask(0,5);
    this.comentario = new Comentario();
    this.salvar = false;
  }

  changePage(event: { page: number; size: number; }) {
    this.findByTask(event.page, event.size);
  }
  viewTaskDetail(){
    this.route.navigate(['/detail-task',this.idTask]);
  }

}
