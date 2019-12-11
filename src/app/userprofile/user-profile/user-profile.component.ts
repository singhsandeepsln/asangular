import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from 'src/app/service/auth.service';
import { MainServiceService } from 'src/app/service/main-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user_profile_data:any=[]
  show_div:boolean;
  hide_div:boolean=true;
  media_url
  image_uploaded
  user_profile_data_bio:any=[]
  constructor(private _auth_service:AuthLoginService, private _main:MainServiceService) {this.media_url=this._main.media_url }

  ngOnInit() {

    // user details
    this._auth_service.user_detail()
    .subscribe(data=>{
     // //console.log(data)
      let res:any=data;
      this.user_profile_data=res.data;
      this.image_uploaded=this.user_profile_data.profile_pic
      let user_bio_check=res.data.profile.biography;

      this.user_profile_data_bio=user_bio_check.trim().length === 0;

     //console.log(this.user_profile_data);
    //  this.Blog_Request_Form.patchValue({
    //   biography:this.user_profile_data.profile.biography,
    //  })

    })
  }

  editProfile(){
    this.show_div=true
    this.hide_div=false;
  }

}
