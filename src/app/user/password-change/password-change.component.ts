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
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  loading:boolean=false;
  chnge_password_Form:FormGroup;
  title='Analytics Steps | password Change';
  constructor( private toastr:ToastrService, private main_service:MainServiceService,private title_ser:Title, private fb:FormBuilder, private router:Router, private auth_Serv:AuthLoginService, private cookie:CookieService,) { }

  ngOnInit() {
    this.title_ser.setTitle(this.title)
    this.chnge_password_Form=this.fb.group({
      old_password:['',[Validators.required]],
      new_password:['',[Validators.required]],
      confirm_password:['',[Validators.required]]
    })

    $('.btn_login').bind('touchend', function(e) {
      e.preventDefault();
      $(this).click();
       })
 
  }
 
 

  onSubmit(){
    this.toastr.clear()
    this.loading=true;
    // this.cookie.remove('token', )
    // this.cookie.put('login','false');
    //console.log(this.chnge_password_Form.value)
    let form_Data=this.chnge_password_Form.value
    this.auth_Serv.password_change(form_Data)
    .subscribe(data=>{
      //console.log(data);
      let res:any=data;

     // this.cookie.remove('token', )
      if(res.status==200){
        this.loading=false;
     //   this.cookie.remove('token', )
     this.toastr.success("Password updated successfully!")
        // Swal.fire({
        //   title: "Password updated Successfully!",
        //   type: 'success',
        // })
        this.cookie.remove('token', )
        this.cookie.put('login','false');
        //sessionStorage.setItem('token',res.token.refresh)
        //console.log('you Sucessfull Login');
        this.router.navigate(['/home']); 
      }
    },
     (err) => {
      this.loading=false;
      //console.log(err)
      //console.log(err.error)
      this.toastr.error(err.error.message)
      // Swal.fire({
      //     title: err.error.message,
      //     type: 'error',
      // })
      // alert("invalid username/password")
  }
    )
  }

}
