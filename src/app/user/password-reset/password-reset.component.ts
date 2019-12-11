import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/service/main-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthLoginService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2'
import { CookieService } from 'ngx-cookie'
import { Title } from '@angular/platform-browser';
import { HeaderService } from 'src/app/service/header.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  loading:boolean=false;
  reset_password_Form:FormGroup;
  token;
  title='Analytics Steps | password Reset';
  constructor(private toastr:ToastrService,  private header_ser:HeaderService ,private main_service:MainServiceService,private title_ser:Title, private fb:FormBuilder, private _route:ActivatedRoute, private router:Router, private auth_Serv:AuthLoginService, private cookie:CookieService,) {

   }
 
  ngOnDestroy(){
    this.header_ser.footer_hide_div.next(true)
  }
  ngOnInit() {
    this.header_ser.footer_hide_div.next(false)
    this.title_ser.setTitle(this.title)
    this._route.queryParams.subscribe(val=>{
      //console.log(val)
      this.token=val.token  
       
    })
   

    this.reset_password_Form=this.fb.group({
      reset_token:this.token,
      password:['',[Validators.required]],
      confirm_password:['',[Validators.required]]
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
    //console.log(this.reset_password_Form.value)
    let form_Data=this.reset_password_Form.value
    this.auth_Serv.password_reset(form_Data)
    .subscribe(data=>{
      //console.log(data);
      let res:any=data;

     // this.cookie.remove('token', )
      if(res.status==200){
        this.loading=false;
     //   this.cookie.remove('token', )
     this.toastr.success("Password reset successful!");
        // Swal.fire({
        //   title: "Password Reset Successful!",
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
      //console.log(err.error)
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
