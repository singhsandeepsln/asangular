import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MainServiceService } from '../service/main-service.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css','../../assets/css/blog.css']
})
export class CategoryPageComponent implements OnInit {
  blog_list:any=[];
  blog_machine_data:any=[];
  blog_deep_data:any=[];
  blog_big_data:any=[];
  blog_nlp_data:any=[];

  blog_machine_loader:boolean=false;
  blog_deep_loader:boolean=false;
  blog_big_loader:boolean=false;
  blog_nlp_loader:boolean=false;


  media_url;
  isLogged:any;
  title='Analytics Steps | Categories';
  constructor(private _main:MainServiceService,private title_ser:Title,private router:Router, private toastr:ToastrService, private cookie:CookieService) { this.media_url=this._main.media_url}

  ngOnInit() {
    this.isLogged=this.cookie.get('login')
    this.title_ser.setTitle(this.title)
    this.blog_machine_loader=true;
    this.blog_deep_loader=true;
    this.blog_big_loader=true;   
    this.blog_nlp_loader=true;   
    // this._main.blog_cat()
    // .subscribe(data=>{ 
    //   let res:any=data;
    //   this.blog_list=res.data;
    // })

    // MACHINE LEARNING 
    this._main.blog_cat_slug('machine-learning')
    .subscribe(data=>{
      let res:any=data;
      //   console.log(data);         
      this.blog_machine_data=res.data;
      if(res.status==200){
        this.blog_machine_loader=false;
      }
    })

    // deep LEARNING 
    this._main.blog_cat_slug('deep-learning')
    .subscribe(data=>{
      let res:any=data;
      this.blog_deep_data=res.data;
      if(res.status==200){
        this.blog_deep_loader=false;
      }
    })

    // MACHINE LEARNING 
    this._main.blog_cat_slug('big-data')
    .subscribe(data=>{
      let res:any=data;
      this.blog_big_data=res.data;
      if(res.status==200){
        this.blog_big_loader=false;
      }
    })

    // MACHINE LEARNING 
    this._main.blog_cat_slug('nlp')
    .subscribe(data=>{
      let res:any=data;
      this.blog_nlp_data=res.data;
      if(res.status==200){
        this.blog_nlp_loader=false;
      }
    })



  }

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
      940: { items: 4 }
    },
    nav: true
  } // end slider 


}
