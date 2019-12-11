import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { MainServiceService } from '../service/main-service.service';
import { HeaderService } from '../service/header.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../assets/css/blog.css']
})
export class HomeComponent implements OnInit, OnDestroy {
 srch_here:boolean=false;
 media_url;
 blog_latest_data:any=[];
 blog_feature_data:any=[];
 blog_cat_list:any=[];
 blog_search_data:any=[];
 chck_result:boolean=false;

 blog_cat_name:any='MOST POPULAR';
 loader_cat:boolean=false;

 emailstring='mailto:info@analyticssteps.com';
 title='Analytics Steps | Home';
//  @ViewChild('myInput', {static: true}) myInput: ElementRef;

 @ViewChild('formRow', {static: false}) inputTxt: ElementRef;
 
  constructor(private _main:MainServiceService, private header_service:HeaderService, private title_ser:Title) { this.media_url=this._main.media_url;
    
  }
 
  ngOnInit() {
    this.title_ser.setTitle(this.title)
   this.header_service.home_hide_txt.next(false)
  }
  ngOnDestroy(){
    this.header_service.home_hide_txt.next(true)
  }
  // onBlurMethod(data){
  //   // console.log(data)
  //   // if(data=' '){return }
  //   // console.log(data)
  //   this._main.blog_search(data)
  //   .subscribe(data=>{
  //     let res:any=data;
  //     //console.log(data)
  //     this.blog_search_data=res.data;
  //     if(res.status==200){
  //       this.chck_result=true;
  //     }
  //   })
  // // alert(this.myModel) 
  // }

  onKeydown(event,value: any){
     if (event.key === "Enter") {

      this._main.blog_search(value)
      .subscribe(data=>{
        let res:any=data;
        //console.log(data)
        this.blog_search_data=res.data;
        if(res.status==200){
          this.chck_result=true;
        }
      })
    }
  }
 
 
  search_open(): void{
    setTimeout(() => {
      this.inputTxt.nativeElement.focus();
    }, 500);
    //console.log(this.inputTxt.nativeElement.value);
    this.blog_cat_name='MOST POPULAR';
    //console.log('open')
    this.srch_here=true;

    // get blog feature 
    this._main.blog_feature('4')
    .subscribe(data=>{
      //console.log(data);
      let res:any=data;
      this.blog_feature_data=res.data;
    })
  
    
    // get blog feature 
    this._main.blog_latest('4')
    .subscribe(data=>{
      //console.log(data);
      let res:any=data;
      this.blog_latest_data=res.data;
    })
  

    // get blog category list
    this._main.blog_cat()
    .subscribe(data=>{
      let res:any=data;
      this.blog_cat_list=res.data;
    })

  }
  search_close(){
    //console.log('close')
    this.srch_here=false;
  return  this.chck_result=false;
  }




  /*--------------  */
  get_category_data(url){
    this.loader_cat=true;
    //console.log(url);
    this._main.blog_cat_slug(url)
    .subscribe(data=>{
      let res:any=data;
      this.blog_feature_data=res.data.blogs;
      this.blog_cat_name=res.data.name
      if(res.status==200){
        this.loader_cat=false;
      }
      //console.log(data);
    },(err)=>{
      this.loader_cat=false;
      //console.log('sa')
    })
  }


}
