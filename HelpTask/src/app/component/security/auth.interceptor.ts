import { SharedService } from 'src/app/services/shared.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  public shared:SharedService;

  constructor() {
      this.shared = SharedService.getInstance();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): 
  Observable<HttpEvent<any>> {
    let authRequest: any;
    if(this.shared.isLoggedIn()){
        authRequest = request.clone({
          setHeaders:{
            'Authorization': this.shared.token
          }
        });
        return next.handle(authRequest);
    }else{
      return next.handle(request);
    }
  }
}
