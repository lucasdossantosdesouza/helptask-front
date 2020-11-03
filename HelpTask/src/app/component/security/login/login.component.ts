import { CurrentUser } from './../../../model/current-user';
import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from './../../../model/usuario';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = new Usuario();
  shared: SharedService;
  message: string;

  constructor(private usuarioService: UsuarioService, private router: Router) {
      this.shared = SharedService.getInstance();
   }

  ngOnInit(): void {
  }

  loginIn(){
    this.message = '';
    this.usuarioService.login(this.usuario).subscribe((usuarioAutentication: CurrentUser) =>{
        this.shared.token = usuarioAutentication.token;
        this.shared.usuario = usuarioAutentication.usuario;
        this.shared.usuario.profile = usuarioAutentication.usuario.profile.substring(5);
        this.shared.showTemplate.emit(true);
        this.router.navigate(['/']);
    }, error =>{
        this.shared.token = null;
        this.shared.usuario = null;
        this.shared.showTemplate.emit(false);
        this.message ='Erro';
    });
    
  }

  cancelaLogin(){
    this.message ='';
    this.usuario = new Usuario();
    window.location.href = "/login";
    window.location.reload();
  }  

}
