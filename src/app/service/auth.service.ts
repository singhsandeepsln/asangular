import { Injectable } from '@angular/core';
import { MainServiceService } from './main-service.service';
import { CookieService } from 'ngx-cookie'
import {HttpClient, HttpHeaders,} from '@angular/common/http'

@Injectable()

export class AuthLoginService{

constructor(private _main: MainServiceService, private cookie: CookieService, public _http:HttpClient) { }
 
httpOption = {
    headers: new HttpHeaders({
       'Access-Control-Allow-Origin':'*',
       'Content-Type': 'application/json' 
    })
}


login(data){
    return this._http.post(this._main.getVerion_url()+'/auth/login/', data,this.httpOption)
}
register(data){
    return this._http.post(this._main.getVerion_url()+'/auth/registration/', data,this.httpOption)
}
socialRegister(data){
    return this._http.post(this._main.getVerion_url()+'/auth/social_registration/', data,this.httpOption)
}
password_change(data){
    return this._http.post(this._main.getVerion_url()+'/auth/change-password/', data,this.httpOption)
}
password_forget(data){
    return this._http.post(this._main.getVerion_url()+'/auth/forgot-password/', data,this.httpOption)
}
password_reset(data){
    return this._http.post(this._main.getVerion_url()+'/auth/reset-password/', data,this.httpOption)
}

user_detail(){
    return this._http.get(this._main.getVerion_url()+'/auth/user_detail/', this.httpOption)
}
social_login(by_social ,data){    
    return this._http.post(this._main.getVerion_url()+'/auth/register-by-token/'+by_social+'/', data,this.httpOption)
}
get_token() {
    return this.cookie.get('token');
}
loggedIn() {
     return !!this.cookie.get('token');
}

logout(){
    return this._http.get(this._main.getVerion_url()+'/auth/logout/',this.httpOption)
}


}