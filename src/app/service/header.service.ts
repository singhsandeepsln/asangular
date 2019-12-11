import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({providedIn:'root' })

export class HeaderService{

    constructor(){}

    home_hide_txt=new BehaviorSubject(false);
    footer_hide_div=new BehaviorSubject(false)


    user_profile_pic=new Subject();
    social_profile_login=new Subject();

    social_pop_up_close=new Subject();
    chck_user_name=new Subject();
    
}