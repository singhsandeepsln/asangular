import {Component,ViewChild,AfterViewInit, OnInit, HostListener, OnDestroy} from '@angular/core';
import { MainServiceService } from 'src/app/service/main-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthLoginService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { NgbModal,  NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HeaderService } from 'src/app/service/header.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-blog-write',
  templateUrl: './blog-write.component.html',
  styleUrls: ['./blog-write.component.css']
})
export class BlogWriteComponent implements OnInit,  AfterViewInit, OnDestroy {
user_profile_data:any=[];
Blog_Request_Form:FormGroup;
document_name:any='Choose file';
file:File
media_url
/*-- pop up  */
loginForm:FormGroup;
registerForm:FormGroup;
private modalRef: NgbModalRef;
loader:boolean=true;
loader_blog_write:boolean=false;
loader_register:boolean=false;
login_check_user:boolean=false;

title='Analytics Steps |  Write a Blog';
@ViewChild('popup_login',{static: true}) content;

constructor(private toastr:ToastrService ,private header_service:HeaderService  ,private title_ser:Title, private cookie:CookieService, private _main:MainServiceService, private fb:FormBuilder, private _auth_service:AuthLoginService, private _router:Router,
  private modalService: NgbModal, private _rout:ActivatedRoute , private _location:Location ) {
    this.media_url=this._main.media_url ;
      // user profile subjetc 
      this.header_service.social_pop_up_close.subscribe(data=>{   
        this.modalRef.close();     
      })
      this.header_service.social_profile_login.subscribe(data=>{
        let res:any=data;
        this.user_profile_data=res.data;
      })
     
     
       
  }


  ngAfterViewInit() {
   //this.open_login_modal()
  }
 
// @HostListener('window:scroll', ['$event']) // for window scroll events
 
  ngOnInit() {
   
    if(this.cookie.get('login')=='false'){
      this.login_check_user=false;
    // this.modalRef = this.modalService.open(this.content, { size: 'lg', backdrop: 'static' });   
    }else{
      this.login_check_user=true;
    }
      
  

    this.title_ser.setTitle(this.title)
     

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


  // form post blog request
  this.Blog_Request_Form=this.fb.group({
    biography:['',[Validators.required]],
    document:['',[]]
  })

  // user details
this.user_Detail()
  } // end ng onit

  ngOnDestroy(){    
    if(this.modalRef){
     return this.modalRef.close()
    }
  
  }
 
  /*----------- file set  ------------ */
  onSelectedFile(event){   
    this.file = event.target.files[0]
    var reader = new FileReader();       
    reader.readAsDataURL(event.target.files[0]); 
    // console.log(event.target.files[0].name)
    this.document_name=event.target.files[0].name;
   }
 
   

onSubmit(){
  this.toastr.clear();
  if(this.file==undefined || this.file== null){
    this.toastr.error('Upload document is required')
   
    return
   }
   if(this.cookie.get('login')=='false'){
    
    this.modalRef = this.modalService.open(this.content, { size: 'lg', backdrop: 'static' });   
    //this.toastr.error("Please login to submit blog!")
    return 
   }
    
    if(this.Blog_Request_Form.get('biography').value.trim().length === 0){
      this.toastr.error('User bio can not be blank!')
      event.preventDefault();
      return  
    }
    

  this.loader_blog_write=true;
 // let form_data=this.Blog_Request_Form.value
  //console.log(form_data)

  const formdata = new FormData();
  formdata.append('biography',this.Blog_Request_Form.get('biography').value);
  formdata.append('document', this.file, this.file.name);



  this._main.blog_request(formdata)
  .subscribe(data=>{
    let res:any=data;
   //  console.log(data)
    if(res.status=='201'){
     // debugger
      this.loader_blog_write=false;
      this.Blog_Request_Form.reset();
      this.document_name='Choose file';
      this.file=undefined;
      this.toastr.success("Blog request sent successfully!")
      this.user_Detail()
      // Swal.fire({
      //   title: 'Successfully blog request sent!',
      //   type: 'success',
      // })
    }
    if(res.status==400){
      // console.log("jashd jkahd")
      this.toastr.error(res.message)
    }
  },(err)=>{
  //   console.log(err)
     this.toastr.error(err.error.message)
    this.loader_blog_write=false;
  })

}

//  user details fetch 

user_Detail(){
  this._auth_service.user_detail()
.subscribe(data=>{
 // console.log(data)
  let res:any=data;
  this.user_profile_data=res.data;
  // console.log(this.user_profile_data);
  this.Blog_Request_Form.patchValue({      
  biography:this.user_profile_data.profile.biography,    
  })

},(err=>{
  //console.log(err.error);
 // this.open_login_modal()    
}))
}


backClicked() {
  this._location.back();
}
/*--------------------  pop up set ----------    --------------  */


onSubmit_login(){
  this.toastr.clear();
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
      // this.user_Detail()
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
  //console.log(this.registerForm.value)
  this.cookie.remove('token');
  this.cookie.put('login','false');
  this.cookie.remove('username');
  
  this.loader_register=true;
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
     this.user_Detail()
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
