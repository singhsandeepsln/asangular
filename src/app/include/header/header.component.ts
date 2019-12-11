import { Component, OnInit, ViewChild, Injectable, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthLoginService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie'
import { TokenInterceptorService } from 'src/app/service/token-interceptor.service';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from 'src/app/service/header.service';
import { MainServiceService } from 'src/app/service/main-service.service';
import { DOCUMENT } from '@angular/common';
declare var jquery:any;
declare var $ :any;
import { trigger, state, transition, style, animate } from '@angular/animations';  
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {
  user_profile_pic:any=[];
  home_hide_txt:boolean=false;
  media_url
  user_profile_data:any=[];
  chck_user_name:any=[];
//  user_not_login:any=false;
 @ViewChild(NgbDropdown ,{static: false})

private dropdown: NgbDropdown;
  constructor(private toastr:ToastrService,  private router:Router, private _auth_service:AuthLoginService, private _route:ActivatedRoute,private header_service:HeaderService, private cookie:CookieService,private _main:MainServiceService, 
  ) {
    this.media_url=this._main.media_url;

      // this.header_service.home_hide_txt.subscribe(res=>{  
      //   this.home_hide_txt=res;
      // })
      this.header_service.chck_user_name.subscribe(
        data=>{
          //console.log(data)
          this.chck_user_name=data
          this.cookie.put('username',this.chck_user_name)
        }
      )

      // user profile subjetc 
      this.header_service.user_profile_pic.subscribe(data=>{
      //console.log(data)
        this.user_profile_pic=data;
      })
      //  user details after come social icon login
      this.header_service.social_profile_login.subscribe(data=>{
       // console.log(data);
        let res:any=data;
        this.user_profile_data=data;
        this.user_profile_pic=res.data.profile_pic;
      //  console.log(this.user_profile_pic)
      })
      
   }
   hide_show(){ 
     var element = document.getElementById("navbarSupportedContent");
     element.classList.remove("show"); 
   }


   

  ngOnInit() {
    this._route.params.subscribe(val=>{
     //  console.log(this._route.snapshot.params['id']);
    //   console.log(val);
        // user details
      this.user_details();
    })


  }

  // user details 
user_details(){
  this._auth_service.user_detail()
  .subscribe(data=>{
  //  console.log(data)
    let res:any=data;
    this.user_profile_data=res.data;
    this.user_profile_pic=res.data.profile_pic;
    let userName:any=res.data.username;
   // console.log(userName)
    this.cookie.put('username',userName)
   // console.log(this.user_profile_data);
  //  this.user_not_login=false;
  },err=>{
 //   console.log(err.error);
    this.cookie.put('login','false');
    this.cookie.remove('username');
   // return this.user_not_login=true;
  })
} // end user details

  user_not_login(){
    let chck_log = this.cookie.get('login');    
    this.chck_user_name=this.cookie.get('username')
    return chck_log
  }


  IsValid(){
    if((this.router.url !='/login')&&(this.router.url !='/register')&&(this.router.url !='/change-password')&&(this.router.url !='/forget-password')&&(this.router.url !='/reset-password')&&(this.router.url !='/reset-password/:id')){ return true; }
    return true;
  }

  logout(){
    this._auth_service.logout()
    .subscribe(data=>{
   //   console.log(data);
      let res:any=data;
      if(res.status==200){
        this.toastr.success('Logout successful!');
        this.cookie.put('login','false');
        this.cookie.remove('token');
        this.cookie.remove('username');
        this.router.navigate(['/'])
      }
      else{
        this.toastr.error('Something wrong!');
        this.router.navigate(['/login'])
      }
      

    })
  } // login end 

 
  // closeMenu() {
  //   console.log('asd')
    
  //   this.dropdown.close();
   
  //   alert('sda')

  // }
}
