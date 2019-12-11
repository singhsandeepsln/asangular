import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../service/main-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
get_userName:any;
user_detail:any;
user_blog_listing=[];
media_url:any;
get_slug:any;
title='Analytics Steps |  Author ';
  constructor(private _main:MainServiceService, private activatedRoute:ActivatedRoute, private route:Router, private title_ser:Title,private router:Router) {
this.media_url=this._main.getMedia_url();
this.title_ser.setTitle(this.title)
   }
  
  ngOnInit() {
   

this._main.getAuthorprofile(this.activatedRoute.snapshot.params['id'])
.subscribe(
  (resp)=>{
    //console.log(resp);
    let resp_data:any=resp;
    this.user_detail=resp_data.data.user_detail;

    this.user_blog_listing=resp_data.data.blogs;
   
     this.title_ser.setTitle('Analytics Steps |  Author | '+  this.user_detail.name)
    //console.log(this.user_detail)
   // console.log(this.user_blog_listing)

  },(err=>{
    // console.error(err)
    if(err.status==500){ this.router.navigateByUrl('/404');}
  })
)
// setTimeout(() => {
//        this.title_ser.setTitle('Analytics Steps |  Author | '+  this.user_detail.name)
// }, 100);


  } //   end ng onit 


  getSlug(slug){
   // console.log(slug)
    this.get_slug= slug;
    this._main.blog_detail(this.get_slug)
.subscribe(
  (data)=>{
  //  console.log(data)
    let f_data:any=data;
    if(f_data.status===200){
     
     // this.route.navigate['/blog']
    }
    
  }
)
  }
}
