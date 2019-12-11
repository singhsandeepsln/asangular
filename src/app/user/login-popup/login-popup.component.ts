import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/service/main-service.service';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2'
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from 'angularx-social-login';
import { NgbModal,  NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie';
declare var $:any;
 
@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css']
})
export class LoginPopupComponent implements OnInit {

  loginForm:FormGroup;
  user:SocialUser;
  loggedIn:boolean;
  social_data;
  private modalRef: NgbModalRef;
  constructor(private main_service:MainServiceService, private fb:FormBuilder, private router:Router, private auth_Serv:AuthLoginService, private authService:AuthService,private cookie:CookieService, private modalService: NgbModal) { }

  ngOnInit() {

    this.loginForm=this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })

    this.authService.authState.subscribe((user) => {
      this.user = user;
      //console.log(this.user)
      
      this.loggedIn = (user != null);
      this.social_data={
        name:this.user.name,
        username:this.user.email,
        email:this.user.email,
        password:this.user.authToken,
        confirm_password:this.user.authToken
      }
      this.auth_Serv.socialRegister(this.social_data)
      .subscribe(
        (data)=>{
          //console.log(data)
        }
      )
    });

    $('.btn_login').bind('touchend', function(e) {
      e.preventDefault();
      $(this).click();
       })
  }

  signInWithGoogle(): void {
    
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }


  signOut(): void {
    this.authService.signOut();
  }

  onSubmit(){
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
        Swal.fire({
          title: "Login Successful!",
          type: 'success',
        })
        this.cookie.put('token',res.token.access)
        this.cookie.put('login','true');
        this.cookie.put('username',res.data.username);
        //sessionStorage.setItem('token',res.token.refresh)
        //console.log('you Sucessfull Login');
       
       // this.modalRef.close();
       // this.router.navigate(['/home']); 
      }
    },
     (err) => {
      //console.log(err);
      this.cookie.remove('username');
      this.cookie.remove('token');
      this.cookie.put('login','false');
      Swal.fire({
          title: "Invalid Username/Password",
          type: 'error',
      })
      // alert("invalid username/password")
  }
    )
  }


}
