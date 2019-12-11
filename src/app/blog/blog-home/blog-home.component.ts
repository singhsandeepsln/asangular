import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/service/main-service.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css','../../../assets/css/blog.css']
})
export class BlogHomeComponent implements OnInit {
  blog_feature_data:any=[];
  blog_latest_data:any=[];
  blog_popular_data:any=[];
  media_url;
  isLogged:any;
  L_data=[]
  title='Analytics Steps | Blogs ';
  constructor(private _main:MainServiceService,private title_ser:Title, private router:Router, private toastr:ToastrService, private cookie:CookieService) {this.media_url=this._main.media_url }

  ngOnInit() {
    this.isLogged=this.cookie.get('login')
    this.title_ser.setTitle(this.title)
    // feature
    this._main.blog_feature('4')
    .subscribe(data=>{
      //console.log(data);
      let res:any=data;
      this.blog_feature_data=res.data;
    })
  


    // latest
    this._main.blog_latest('6')
    .subscribe(data=>{
      //console.log(data);
      let res:any=data;
      this.blog_latest_data=res.data;
    
     
    })

    // popular
    this._main.blog_popular('4')
    .subscribe(data=>{
      //console.log(data);
      let res:any=data;
      this.blog_popular_data=res.data;
    
    })
   

  }   // edn ng onit
  checkSignUp(isLogged){
    this.toastr.clear();
    if(isLogged ==='false'){
     this.router.navigate(['/register'])
 }
 else if(isLogged==='true'){
   //alert('true')
   this.toastr.success('You are already logged in')

 }
  }

  // start crausel slider
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin: 18,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 3 }
    },
    nav: true
  } // end slider 


}
