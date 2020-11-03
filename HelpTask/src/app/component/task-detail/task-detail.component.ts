import { ChangeStatus } from '../../model/change-status';
import { ResponseApi } from '../../model/response-api';
import { AlertService } from '../../_alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { SharedService } from '../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  shared:SharedService;
  task = new Task();
  
  constructor(private taskService: TaskService, private router: ActivatedRoute
    ,public alertService: AlertService,private route:Router) {
      this.shared = SharedService.getInstance();
  }

  ngOnInit(): void {
    let id: string = this.router.snapshot.params['id'];
    if(id != undefined){
      this.findByid(id);
    }
  }
  findByid(id: string){
    this.taskService.findById(id).subscribe((responseApi: ResponseApi)=>{
      this.task = responseApi.data; 
      this.task.data = new Date(this.task.data).toISOString();   
    }, error=>{     
      this.alertService.error(error['error']['errors'][0],{ id: 'alert-1' });     
    }     
    );
  }

  changeStatus(status: string){
    this.task.status = status;
    this.taskService.changeStatus(this.task).subscribe((responseApi: ResponseApi)=>{
      this.task = responseApi.data; 
      this.task.data = new Date(this.task.data).toISOString();   
      this.alertService.success(`Task ${this.getStatus()} com sucesso`,{ id: 'alert-1' });
      setTimeout(() => {
        this.alertService.clear('alert-1');        
        this.findByid(this.task.id);   
      }, 2000);   
    }, error=>{     
      this.alertService.error(error['error']['errors'][0],{ id: 'alert-1' });     
    }     
    );
  }

  getStatus()  : string{
    if(this.task.status == 'New'){
      return 'Nova'
    }else if(this.task.status == 'Assigned'){
      return 'Atribuída'
    }else if(this.task.status == 'Resolved'){
      return 'Resolvida'
    }else if(this.task.status == 'Aproved'){
      return 'Aprovada'
    }if(this.task.status == 'Disaproved'){
      return 'Desaprovada'
    }
    return 'Fechada'
  }

  getPriority()  : string{
    if(this.task.priority == 'High') {
      return 'Alta'
    }else if(this.task.priority == 'Normal'){
      return 'Normal'
    }else if(this.task.priority == 'Low'){
      return 'Baixa'
    }
  }

  
  getStatusChange(changeStatus: ChangeStatus)  : string{
    if(changeStatus.statusEnum == 'New'){
      return 'Nova'
    }else if(changeStatus.statusEnum == 'Assigned'){
      return 'Atribuída'
    }else if(changeStatus.statusEnum == 'Resolved'){
      return 'Resolvida'
    }else if(changeStatus.statusEnum == 'Aproved'){
      return 'Aprovada'
    }if(changeStatus.statusEnum == 'Disaproved'){
      return 'Desaprovada'
    }
    return 'Fechada'
  }
  viewTaskComentarios(){
    this.route.navigate(['/comentario-task',this.task.id]);
  }
  viewTaskList(){
    this.route.navigate(['/lista-task']);
  }

}
