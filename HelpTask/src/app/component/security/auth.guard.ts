import { SharedService } from 'src/app/services/shared.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  

  public shared: SharedService;

  constructor(private router: Router){
    this.shared = SharedService.getInstance();
  }
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
      if(this.shared.isLoggedIn()){
          return true;  	
      }
      this.router.navigate(['/login']);
      return false;
  }

  
  
}
