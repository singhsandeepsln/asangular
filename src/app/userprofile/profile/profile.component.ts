import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/service/main-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  show_div:boolean;
  hide_div:boolean=true;
  f_data:any;
  media_url:any;
  blogs_by=[];
  data_count:any=1;
  loader_blog:boolean=false;
  title='Analytics Steps | User Profile';
  constructor(private _main:MainServiceService,private title_ser:Title) {
    this.media_url=this._main.getMedia_url();
   }

  ngOnInit() {
    this.loader_blog=true;
    this.title_ser.setTitle(this.title)
    this._main.userReadBlog()
    .subscribe(
      (resp)=>{
   //  console.log(resp)
        let blog_data:any=resp;
        this.f_data=blog_data.data;
        //console.log(this.f_data)
        if(blog_data.status==200){
           this.loader_blog=false;
        }
        this.data_count=this.f_data.length
        //console.log(this.data_count)
       
      }
    )
  }

  editProfile(){
    this.show_div=true
    this.hide_div=false;
  }
}
