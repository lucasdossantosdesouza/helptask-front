import { AlertService } from './../../_alert/alert.service';
import { ResponseApi } from './../../model/response-api';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import { SharedService } from 'src/app/services/shared.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})

export class UserNewComponent implements OnInit {

  usuario = new Usuario();
  shared:SharedService; 

  constructor(private usuarioService: UsuarioService, private route:Router,
    private router:ActivatedRoute, public alertService: AlertService) { 
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
    this.usuarioService.findById(id).subscribe((responseApi: ResponseApi)=>{
      this.usuario = responseApi.data;
      this.usuario.password = '';
    }, error=>{     
      this.alertService.error(error['error']['errors'][0],{ id: 'alert-1' });     
    }     
    );
  }

  registrar(){
    
    this.usuarioService.createOrUpdate(this.usuario).subscribe(
      (responseApi: ResponseApi)=>{          
          let userRet: Usuario = responseApi.data;
          this.alertService.success(`Usuario ${userRet.email} salvo com sucesso `,
          { id: 'alert-1' });
          setTimeout(() => {
            this.alertService.clear('alert-1');
            this.usuario = new Usuario();
            this.route.navigate(['/novo-usuario']);
           
          }, 4000);
           
    });
  } 

}
