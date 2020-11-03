import { Time } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { AlertService } from '../../_alert/alert.service';
import { ResponseApi } from '../../model/response-api';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { Task } from '../../model/task';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.css']
})
export class TaskNewComponent implements OnInit {
  
  task = new Task();
  shared: SharedService;
  dias:number = 0;
  horas:any;

  constructor(private tasktService: TaskService, private router: ActivatedRoute,
    public alertService: AlertService,private route:Router) {
    this.shared = SharedService.getInstance();
   }

   ngOnInit(): void {
    let id: string = this.router.snapshot.params['id'];
    if(id != undefined){
      console.log(id);
      this.findByid(id);
    }
  }

  findByid(id: string){
    this.tasktService.findById(id).subscribe((responseApi: ResponseApi)=>{
      this.task = responseApi.data;
          
    }, error=>{     
      this.alertService.error(error['error']['errors'][0],{ id: 'alert-1' });     
    }     
    );
  }

  registrar(){    
    if(this.dias != null && this.dias > 0){
      this.task.tempoGasto = this.dias +' dia(s) ';
    }else{
      this.task.tempoGasto ='0 dia(s)';
    }
    if(this.horas != null){
      this.task.tempoGasto = (this.task.tempoGasto != null ? this.task.tempoGasto : '') + ' e '+this.horas +' hora(s)/minuto(s) ';
    }
    this.tasktService.createOrUpdate(this.task).subscribe(
      (responseApi: ResponseApi)=>{          
          let taskRet: Task = responseApi.data;
          this.alertService.success(`Task ${taskRet.titulo} salvo com sucesso `,
          { id: 'alert-1' });
          setTimeout(() => {
            this.alertService.clear('alert-1');            
            if( this.shared.usuario.profile == 'TECHNICIAN' ){
              this.route.navigate(['/lista-task']);
            }else{
              this.task = new Task();
              this.route.navigate(['/novo-task']);
            }
          }, 4000);
           
    });
  } 

  onFileChange(event: { target: { files: Blob[]; }; }): void{
    if(event.target.files[0].size > 2000000){
      this.alertService.success("Tamanho máximo para imagens é de 2MB",
      { id: 'alert-1' });
    }else{
      this.task.image = '';
      var rander = new FileReader();
      rander.onloadend = (e: Event) =>{
        this.task.image = rander.result;
      }
      rander.readAsDataURL(event.target.files[0]);
    }
  }
 

}
