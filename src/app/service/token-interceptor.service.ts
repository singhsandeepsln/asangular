import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
// import { dashboardService } from "./dashboard.services";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { error } from "protractor";
import { CookieService } from 'ngx-cookie';
 


@Injectable()

export class TokenInterceptorService implements HttpInterceptor{

    constructor(private _injector:Injector,  private cookie: CookieService, ){}

    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>  {
        
       
       const token=this.cookie.get('token') //localStorage.getItem('token')

       const token_set_all='Bearer'+' '+  token;
    //   console.log(token)
    //    console.log(token_set_all)
       if(token){
        // this.header_compoent.user_details();
        // console.log('user login');
        req = req.clone({ headers: req.headers.set('Authorization', token_set_all) });
        // req = req.clone({ headers: req.headers.set('Accept', "text/html") });   
             
       // return 
       }
       if (!req.headers.has('Content-Type')) {           
        //   console.log('chk hedrs')
        // req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
       }

    //    req = req.clone({ headers: req.headers.set('Accept','application/json') });
       //req = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin','*',)});
       return next.handle(req).pipe(
           map((event: HttpEvent<any>) => {
               
               if (event instanceof HttpResponse) {
                   //console.log('event--->>>', event);
                   // this.errorDialogService.openDialog(event);
               }
               return event;
           }),
           
           // set error here
        //    catchError((error:HttpErrorResponse)=>{

        //    })
          // end catch error

       )
       
        
        //console.log(authService.getToken())
        //
    }
}