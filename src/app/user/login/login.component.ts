import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/service/main-service.service';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2'
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from 'angularx-social-login';

import { CookieService } from 'ngx-cookie'
import { Title } from '@angular/platform-browser';
import { HeaderService } from 'src/app/service/header.service';
 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  user:SocialUser;
  loggedIn:boolean;
  social_data;
  title='Analytics Steps | Login';
  loading:boolean=false
  user_profile_pic:any=[];
  constructor(private toastr:ToastrService, private header_service:HeaderService ,private main_service:MainServiceService, private fb:FormBuilder, private router:Router,private title_ser:Title, private auth_Serv:AuthLoginService, private authService:AuthService,private cookie:CookieService,) { 
   
  }

  ngOnInit() {
    this.title_ser.setTitle(this.title)
    this.loginForm=this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })

    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   //console.log(this.user)
      
    //   this.loggedIn = (user != null);
    //   this.social_data={
    //     name:this.user.name,
    //     username:this.user.email,
    //     email:this.user.email,
    //     password:this.user.authToken,
    //     confirm_password:this.user.authToken
    //   }
    //   this.auth_Serv.socialRegister(this.social_data)
    //   .subscribe(
    //     (data)=>{
    //       //console.log(data)
    //     }
    //   )
    // });
  }

  signInWithGoogle(): void {
    
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }


  signOut(): void {
    this.authService.signOut();
  }

  onSubmit(){
    this.toastr.clear()
    this.loading=true;
    this.cookie.remove('token');
    this.cookie.put('login','false');
    this.cookie.remove('username');
    //console.log(this.loginForm.value)
    let form_Data=this.loginForm.value
    this.auth_Serv.login(form_Data)
    .subscribe(data=>{
      //console.log(data);
      let res:any=data;

     // this.cookie.remove('token', )
      if(res.status==200){
     //   this.cookie.remove('token', )<p></p>
     this.header_service.user_profile_pic.next(res.data.profile_pic)
        this.loading=false;
        this.toastr.success('Login successful!');
        // Swal.fire({
        //   title: "Login Successful!",
        //   type: 'success',
        // })
        this.cookie.put('token',res.token.access)
        this.cookie.put('login','true');
        this.cookie.put('username',res.data.username);
        //sessionStorage.setItem('token',res.token.refresh)
        ////console.log('you Sucessfull Login');
        this.router.navigate(['/home']); 
      }
    },
     (err) => {
      //console.log(err);
    //  this.toastr.error('Hello world!', 'Toastr fun!');
      this.loading=false;
      this.cookie.remove('username');
      this.cookie.remove('token');
      this.cookie.put('login','false');
      this.toastr.error("Invalid username/password")
      // Swal.fire({
      //     title: "invalid username/password",
      //     type: 'error',
      // })
      // alert("invalid username/password")
  }
    )
  }


}
