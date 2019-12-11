import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from 'angularx-social-login';
import { AuthLoginService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { HeaderService } from 'src/app/service/header.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  public now: Date = new Date();
  
  @Input() hero: string;
  constructor(private _route_active:ActivatedRoute ,private authService:AuthService, private auth_login:AuthLoginService,private toastr:ToastrService, private router:Router, private cookie:CookieService, private header_service:HeaderService) { }

  ngOnInit() {
   // console.log(this.hero)

  }

  // this._route.params.subscribe(val=>{

  // }

  signInWithGoogle(): void {

    this._route_active.params.subscribe(val=>{
    
    })
    
    
   // console.log('asdas')
   this.cookie.remove('token');
   this.cookie.put('login','false');
   this.cookie.remove('username');

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
     // console.log(x)
     // let res:any=x;
      this.now = new Date();
      let total_send_service={access_token :x.authToken,email:x.email,auth_time:this.now}
     // console.log(total_send_service);
      this.auth_login.social_login( 'google', total_send_service)
      .subscribe(data=>{
      //  console.log(data);
        let res:any=data;

         if(res.status==200){

          this.toastr.success('Login successful!');
          this.cookie.put('token',res.token)
          this.cookie.put('login','true');
         
          
          //  user details get google after
              this.auth_login.user_detail()
              .subscribe(user_data=>{
             //   console.log(user_data);
                let res_user:any=user_data;
                this.header_service.social_profile_login.next(res_user)
                this.cookie.put('username',res_user.data.username);    
              })

              if(this.hero=='login_page' || this.hero=='register_page' ){
                 this.router.navigate(['/home']); 
              }
              else{
             
                this.header_service.social_pop_up_close.next('pop_up_close')
              }

         // end user details google end     
         }
     

      },(err)=>{
      //  console.log(err)
        this.toastr.error(err.error.message);
      })


    },(err)=>{      
    //  console.log(err)
      this.toastr.error('Login failed!');
      });

  }


  // signOut(): void {
  //   this.authService.signOut();
  // }

}
