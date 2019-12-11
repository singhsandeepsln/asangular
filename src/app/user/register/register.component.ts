import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/service/main-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2'
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  title='Analytics Steps | Register';
  loading:boolean=false;
  constructor( private toastr:ToastrService ,private _main_service:MainServiceService,private title_ser:Title,private fb:FormBuilder,private router:Router , private _auth_service:AuthLoginService ) { }

  ngOnInit() {
    this.title_ser.setTitle(this.title)
    this.registerForm=this.fb.group({
      name :['',[Validators.required,Validators.maxLength(25),Validators.minLength(3)]],
      username :['',[Validators.required,Validators.maxLength(25),Validators.minLength(3)]],
      email :['',[Validators.required, Validators.email,Validators.maxLength(35)]],
      mobile:['',[Validators.required, Validators.pattern('^[0-9]+$'),Validators.maxLength(10),Validators.minLength(10)]],
      password :['',[Validators.required]],
      confirm_password :['',[Validators.required]],
    });

    $('.btn_login').bind('touchend', function(e) {
      e.preventDefault();
      $(this).click();
       })
    
  }

  onSubmit(){
    this.toastr.clear();
    this.loading=true;
    //console.log(this.registerForm.value)
    let form_Data=this.registerForm.value
    this._auth_service.register(form_Data)
    .subscribe(data=>{
      //console.log(data);
      let res:any=data;
      if(res.status==201){
        this.loading=false;
        this.toastr.success('Registration successful!');
        // Swal.fire({
        //   title: "Registration Successfull",
        //   type: 'success',
        // })
        ////console.log('you sucessfull Register');
        this.router.navigate(['/login'])
      }
    },  (err) => {
      this.loading=false;
      this.toastr.error(err.error.message);
      //console.log(err.error.message)
      // Swal.fire({
      //     title: err.error.message,
      //     type: 'error',
      // })
      // alert("invalid username/password")
  })
  }

}
