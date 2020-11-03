import { ResponseApi } from './../../model/response-api';
import { AlertService } from './../../_alert/alert.service';
import { Summary } from './../../model/summary';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  shared:SharedService;  
  summary = new Summary();
  
  constructor(private taskService: TaskService, private router: ActivatedRoute,
    public alertService: AlertService) {
      this.shared = SharedService.getInstance();
  }

  ngOnInit(): void {
      this.findSummary();
  }

  findSummary(){   
    this.taskService.summary().subscribe((responseApi: ResponseApi)=>{
      this.summary = responseApi.data;   
      console.log(this.summary);      
    }, error=>{
      this.alertService.error(error['error']['errors'][0],{ id: 'alert-1' });   
    }     
    );
  }

}
