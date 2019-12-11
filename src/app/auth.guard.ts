import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthLoginService } from './service/auth.service';
 

@Injectable({providedIn:'root'})

export class AuthGuard implements CanActivate{
    constructor(private router:Router, private _auth_login_service:AuthLoginService){}
    
    canActivate():boolean{
    if(this._auth_login_service.loggedIn()){
       // console.log('login true')
        return true;
    }
    this.router.navigate(['/login']);
   //  console.log('login not work')
     return false;

    } // end can activate

 


 

}
