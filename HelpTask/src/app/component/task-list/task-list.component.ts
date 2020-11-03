import { TaskService } from '../../services/task.service';
import { ResponseApi } from '../../model/response-api';
import { Router } from '@angular/router';
import { AlertService } from '../../_alert/alert.service';
import { DialogService } from '../../services/dialog.service';
import { Page } from '../../model/page';
import { Task } from '../../model/task';
import { SharedService } from '../../services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  shared:SharedService;
  tasks:Array<Task>; 
  paginas:Array<number>; 
  page: Page;
  count:number = 5;
  pag:number = 0;
  assignedToMe:boolean = false;
  taskFilter =new  Task();

  constructor(private taskService: TaskService,
    private router:Router,private dialogService: DialogService,
    public alertService: AlertService) { 
    this.shared = SharedService.getInstance();
  }

  ngOnInit(): void {
    this.findAll(this.pag, this.count);
  }

  findAll(page: number, count: number){   
    this.taskService.listtasks(page, count).subscribe((responseApi: ResponseApi)=>{
      this.tasks = responseApi.data.content;     
      this.page = responseApi.data;
      this.paginas = [this.page.totalPages];
    }, error=>{
      this.alertService.error(error['error']['errors'][0],{ id: 'alert-1' });   

    }     
    );
  }

  filter(){ 
    this.pag = 0 ;
    this.count = 5; 
    this.taskService.findByParams(this.pag, this.count,this.taskFilter,this.assignedToMe)
    .subscribe((responseApi: ResponseApi)=>{
      this.taskFilter.number = this.taskFilter.number == 0 ? null : this.taskFilter.number;
      this.taskFilter.titulo = this.taskFilter.titulo == 'uninformed' ? '' : this.taskFilter.titulo;
      this.tasks = responseApi.data.content;
      this.page = responseApi.data;
      this.paginas = [this.page.totalPages];
    }, error=>{
      this.alertService.error(error['error']['errors'][0],{ id: 'alert-1' });     

    }     
    );
  }

  cleanFilter(){
    this.assignedToMe = false;
    this.pag = 0 ;
    this.count = 5;
    this.taskFilter = new Task();
    this.findAll(this.pag, this.count);
  }

  edit(id: string){
      this.router.navigate(['/novo-task',id]);
  }

  detail(id: string){
    this.router.navigate(['/detail-task',id]);
  }

  delete(id: string){
    this.dialogService.confirm('Deseja Realmente excluir a task')
    .then((candelete: boolean)=>{
      if(candelete){
        this.taskService.delete(id).subscribe((responseApi: ResponseApi)=>{
          this.alertService.success('Task Excluida com sucesso',{ id: 'alert-1' });         
          setTimeout(() => {
            this.alertService.clear('alert-1');           
            this.router.navigate(['/lista-task']);
          }, 4000);
        }, error=>{
          this.alertService.error(error['error']['errors'][0],{ id: 'alert-1' });     

        }     
        );
      }
    })    
  }   

  changePage(event: { page: number; size: number; }) {
    this.findAll(event.page, event.size);
  }

  public getStatus(task: Task)  : string{
    if(task.status == 'New'){
      return 'Nova'
    }else if(task.status == 'Assigned'){
      return 'Atribuída'
    }else if(task.status == 'Resolved'){
      return 'Resolvida'
    }else if(task.status == 'Aproved'){
      return 'Aprovada'
    }if(task.status == 'Disaproved'){
      return 'Desaprovada'
    }
    return 'Fechada'
  }

  public getPriority(task: Task) : string{
    if(task.priority == 'High'){
      return 'Alta'
    }else if(task.priority == 'Normal'){
      return 'Normal'
    }else if(task.priority == 'Low'){
      return 'Baixa'
    }
  }
  
}
