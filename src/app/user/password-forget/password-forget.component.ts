import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/service/main-service.service';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2' 
import { CookieService } from 'ngx-cookie'
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-password-forget',
  templateUrl: './password-forget.component.html',
  styleUrls: ['./password-forget.component.css']
})
export class PasswordForgetComponent implements OnInit {


  forget_password_Form:FormGroup;
  loading:boolean=false;
  title='Analytics Steps | password Forget';
  constructor(private toastr:ToastrService, private main_service:MainServiceService,private title_ser:Title, private fb:FormBuilder, private router:Router, private auth_Serv:AuthLoginService, private cookie:CookieService,) { }

  ngOnInit() {
    this.title_ser.setTitle(this.title)
    this.forget_password_Form=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      
    })

 
    
    $('.btn_login').bind('touchend', function(e) {
      e.preventDefault();
      $(this).click();
       })
  }
 
 

  onSubmit(){
    this.toastr.clear();
    this.loading=true;
    // this.cookie.remove('token', )
    // this.cookie.put('login','false');
    //console.log(this.forget_password_Form.value)
    let form_Data=this.forget_password_Form.value
    this.auth_Serv.password_forget(form_Data)
    .subscribe(data=>{
      //console.log(data);
      let res:any=data;

     // this.cookie.remove('token', )
      if(res.status==200){
     //   this.cookie.remove('token', )
     this.toastr.success("Password recovery link sent to your email id!");
        // Swal.fire({
        //   title: "Password recovery link sent to your email id!",
        //   type: 'success',
        // })
        // this.cookie.remove('token', )
        // this.cookie.put('login','false');
        //sessionStorage.setItem('token',res.token.refresh)
        ////console.log('you Sucessfull Login');
        this.router.navigate(['/login']); 
      }
    },
     (err) => {
       this.loading=false;
      //console.log(err)
      //console.log(err.error.message)
      this.toastr.error(err.error.message);
      // Swal.fire({
      //     title: err.error.message,
      //     type: 'error',
      // })
      
      // alert("invalid username/password")
  }
  
    )
  }
}
