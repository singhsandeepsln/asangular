import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { MainServiceService } from '../service/main-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { NgbModal,  NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from '../service/header.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { AuthLoginService } from '../service/auth.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {
career_data=[];
careerForm:FormGroup;
file:File;
fileName:any='Upload Resume';
loading:boolean=false;
title='Analytics Steps | Careers';

// pop up 
isLogged;
@ViewChild('popup_login',{static: true}) content;
loginForm:FormGroup;
registerForm:FormGroup;
loader_register:boolean=false;
private modalRef: NgbModalRef;


  constructor( private toastr:ToastrService,private modalService: NgbModal,private cookie:CookieService,  private config: NgbAccordionConfig, private _main:MainServiceService, 
    private fb:FormBuilder,private title_ser:Title, private header_service:HeaderService, private _router:Router, private _auth_service:AuthLoginService ) {
    this.config.closeOthers=true;
    // close on social icon set
    this.header_service.social_pop_up_close.subscribe(data=>{   
      this.modalRef.close();     
    })
   // this.config.type='info'
   }

  ngOnInit() {
   this.title_ser.setTitle(this.title)
   this.carrer_list();

   /*-----------  */

  
   // this._meta.addTag({name: 'keywords', content: 'Angular Project, Create Angular Project'});
   // this._meta.addTag({name: 'description', content: 'Angular project training on rsgitech.com'});
// login form 
this.loginForm=this.fb.group({
 username:['',[Validators.required]],
 password:['',[Validators.required]]
})

// regsiter form
this.registerForm=this.fb.group({
 name :['',[Validators.required]],
 username :['',[Validators.required]],
 email :['',[Validators.required]],
 mobile:['',[Validators.required]],
 password :['',[Validators.required]],
 confirm_password :['',[Validators.required]],
});
// e nd form 

    

    /**Career form */
      this.careerForm=this.fb.group({
        job_profile:['',[Validators.required, ]],
        email:['',[Validators.required,Validators.email]],
        phone:['',[Validators.required, Validators.pattern('^[0-9]+$'),Validators.minLength(10),Validators.maxLength(10)]],
        first_name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
        last_name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
        resume:['',[]],
      })
    /**Career form */
  }

  carrer_list(){
    this._main.getJobs()
    .subscribe(
      (data)=>{
        let get_data:any=data;
         this.career_data=get_data.data;
        //console.log(this.career_data);        
      }
    )

  }
  onFileSelected(event){
    this.file=event.target.files[0];
    //console.log(this.file)
    this.fileName=this.file.name
    var reader= new FileReader();
    reader.readAsDataURL(event.target.files[0])
  }
  onSubmit(){
    this.toastr.clear();

    this.isLogged=this.cookie.get('login')
   // console.log(this.isLogged)
    if(this.isLogged=='false'){      
       return this.modalRef = this.modalService.open(this.content, { size: 'lg', backdrop: 'static' });
    }

    else{
      
       if(this.file==undefined || this.file== null){
        this.toastr.error('Upload resume is required')
        return
       }

      this.loading=true;
      const formdata= new FormData();
      formdata.append('job_profile', this.careerForm.get('job_profile').value);
      formdata.append('email', this.careerForm.get('email').value);
      formdata.append('phone', this.careerForm.get('phone').value);
      formdata.append('first_name', this.careerForm.get('first_name').value);
      formdata.append('last_name', this.careerForm.get('last_name').value);
      if(this.file){
      formdata.append('resume', this.file,this.file.name);
        }
       
        this._main.careerForm(formdata)
        .subscribe(
          (resp)=>{
            ////console.log(resp)
            let career_resp:any=resp
           
            if(career_resp.status==201){
              this.loading=false;
              this.careerForm.reset();
              this.carrer_list();
              this.fileName='Upload Resume' 
              this.file=undefined;
               this.toastr.success(career_resp.message)
            // swal.fire({
            //   title:career_resp.message,
            //   type:'success'
            // })
            
  
            }
          },(err)=>{
            this.loading=false;
            this.toastr.error(err.error.message)
            // swal.fire({
            //   title:err.error.message,
            //   type:'error'
            // })
             //console.log(err)
          }
        ) // end service 
    }
   // //console.log(this.careerForm.value);
    
    }




/*  -------------------   -----------------------   po up start   ----------    ------------  */

ngOnDestroy(){    
  if(this.modalRef){
    this.modalRef.close()
  }  
}
onSubmit_login(){
  this.cookie.remove('token');
  this.cookie.put('login','false');
  this.cookie.remove('username');
 // console.log(this.loginForm.value)
  let form_Data=this.loginForm.value
  this._auth_service.login(form_Data)
  .subscribe(data=>{
  //  console.log(data);
    let res:any=data;

   // this.cookie.remove('token', )
    if(res.status==200){
   //   this.cookie.remove('token', )<p></p>
   this.header_service.user_profile_pic.next(res.data.profile_pic)
      // Swal.fire({
      //   title: "Login Successful!",
      //   type: 'success',
      // })
      this.toastr.success("Login successful!")
      this.cookie.put('token',res.token.access)
      this.cookie.put('login','true');
      this.cookie.put('username',res.data.username);
      //sessionStorage.setItem('token',res.token.refresh)
      //console.log('you Sucessfull Login');
     
       this.modalRef.close();
     //  this.user_Detail()
     // this.router.navigate(['/home']); 
    }
  },
   (err) => {
   // console.log(err);
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


// close popup and redirect page 
pop_forget_password(){
  this.modalRef.close();
  this._router.navigate(['/forget-password']); 
}
pop_register(customContent){
  this.modalRef.close();
  this.modalRef = this.modalService.open(customContent, { size: 'lg', backdrop: 'static' });
  //this.router.navigate(['/register']); 

}



onSubmit_register(custom_register){
  this.loader_register=true;
  //console.log(this.registerForm.value)
  let form_Data=this.registerForm.value
  this._auth_service.register(form_Data)
  .subscribe(data=>{
 //   console.log(data);
    let res:any=data;
    if(res.status==201){
      this.loader_register=false;
      this.registerForm.reset();
      this.modalRef.close();
      // Swal.fire({
      //   title: "Register Success!",
      //   type: 'success',
      // })
      this.toastr.success('Register successful!');
     // console.log('you sucessfull Register');
      setTimeout(()=>{  
        this.modalRef =  this.modalService.open(custom_register, { size: 'lg', backdrop: 'static' }); 
      }, 100);
    //  this.modalRef = this.modalService.open(customContent, { size: 'lg', backdrop: 'static' }); 
     // this.router.navigate(['/login'])
    // this.user_Detail()
    }
  },  (err) => {
    this.loader_register=false;
   // console.log(err.error.message)
    this.toastr.error(err.error.message);
    // Swal.fire({
    //     title: err.error.message,
    //     type: 'error',
    // })
    
})
}







}

