import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/service/main-service.service';
import { AuthService } from 'angularx-social-login';
import { AuthLoginService } from 'src/app/service/auth.service';
import swal from 'sweetalert2'
import { HeaderService } from 'src/app/service/header.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.css']
})
export class CreateprofileComponent implements OnInit {
  createProfile:FormGroup
  patchData:any;
  show_div:boolean;
  hide_div:boolean=true;
  file:File;
  image_uploaded:any;
  media_url:any;
  get_user_image:any;
  loader_img:boolean=false;
  loader:boolean=false;

  user_profile_pic:any=[]
  chck_user_name:any=[];

  constructor(private toastr:ToastrService,  private _main:MainServiceService, private fb:FormBuilder, private _authservice:AuthLoginService, private header_serv:HeaderService) { 
    this.media_url=this._main.getMedia_url();
  }

  ngOnInit() {
    this.createProfile=this.fb.group({
      username:['',[Validators.required,Validators.maxLength(25),Validators.minLength(3)]],
      name:['',[Validators.required,Validators.maxLength(25),Validators.minLength(3)]],
      email:['',[Validators.required]],
      mobile:['',[Validators.required, Validators.pattern('^[0-9]+$'),Validators.maxLength(10)]],
      profile_pic:['',[Validators.required]],
      biography:['',[Validators.required]]
      // profile:this.fb.group({
      //   biography:['',[Validators.required]]
      // }),
    })
    this.get_user_details();

    $('.submit').bind('touchend', function(e) {
      e.preventDefault();
      $(this).click();
       })
 
  }
  get_user_details(){
    this._authservice.user_detail()
    .subscribe(
      (data)=>{
        //console.log(data)
        let rec_data:any=data;
        //console.log(rec_data.data.profile.biography)
       // this.user_profile_data=rec_data.data; 
        this.get_user_image=rec_data.data.profile_pic
        this.createProfile.patchValue({
          username:rec_data.data.username,
          name:rec_data.data.name,
          email:rec_data.data.email,
          mobile:rec_data.data.mobile,
          biography:rec_data.data.profile.biography,
        })
      }
    )
  }
  editProfile(){
    this.show_div=true
    this.hide_div=false;
  }
  onSelected(event){
      ////console.log(event)
      this.file=event.target.files[0];
      //console.log(this.file)
      this.loader_img=true;
      var reader= new FileReader();
      reader.readAsDataURL(event.target.files[0])
      const formdata_img=new FormData();
      if(this.file){
        formdata_img.append('profile_pic', this.file, this.file.name);
       
      }
      this._main.updateProfilePic(formdata_img)
      .subscribe((image_resp)=>{

       // //console.log(image_resp)
        let resp_success:any=image_resp;
        //console.log(resp_success.message)
        if(resp_success.status===201){
          this.toastr.success(resp_success.message)
          this.loader_img=false;
          this.get_user_details()
          this.header_serv.user_profile_pic.next(resp_success.data.profile_pic)
          // swal.fire({
          //   title:resp_success.message,
          //   type:"success"
          // })
         
        }
        // this.hide_div=false;
        // this.show_div=true;
     
      },(err)=>{
        this.loader_img=false;
        //console.log(err)
        if(err.status===400){
          this.toastr.error(err.error.message)
          // swal.fire({
          //   title:err.error.message,
          //   type:"error"
          // })
        }
      }
    )
  }

  onSubmit(){
    this.toastr.clear();
    this.loader=true
    //console.log(this.createProfile.value);
    //if()
    // if(this.createProfile.get('biography').value.trim().length === 0){
    //   this.toastr.error('Please not fill space!')
    //   event.preventDefault();
    //   return this.loader=false;
    // }
   // console.log(this.createProfile.get('biography').value)
    const formdata=new FormData();
    formdata.append('username',this.createProfile.get('username').value);
    formdata.append('name',this.createProfile.get('name').value);
    formdata.append('email',this.createProfile.get('email').value);
    formdata.append('mobile',this.createProfile.get('mobile').value);
    formdata.append('biography',this.createProfile.get('biography').value);
 
    this._main.updateProfile(formdata)
    .subscribe( (resp)=>{
              //
         let resp_success:any=resp;
        // console.log(resp_success)
         if(resp_success.status===201){
          this.header_serv.chck_user_name.next(resp_success.data)
          this.toastr.success(resp_success.message)
          this.loader=false;
          //  swal.fire({
          //    title:resp_success.message,
          //    type:"success"
          //  })
          
         }
         this.hide_div=false;
        this.show_div=true;

      },(err)=>{
        this.loader=false;
        console.log(err)
        this.toastr.error(err.error.message)
        // swal.fire({
        //   title:err.error.message,
        //   type:"error"
        // })
      }
    )/**Update profile */

    
  }

}
