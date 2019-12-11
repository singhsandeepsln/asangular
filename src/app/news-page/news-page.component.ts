import { Component, OnInit, HostListener } from '@angular/core';
import { MainServiceService } from '../service/main-service.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {
news_data:any=[];
loader:boolean=true;
p:number;
fragment
isLogged:any;
title='Analytics Steps | News';
  constructor(private _main:MainServiceService,private title_ser:Title,private router:Router, private toastr:ToastrService, private cookie:CookieService,private _rout:ActivatedRoute) { }


  ngAfterViewChecked(): void {

   // console.log('sadasd')
   // setTimeout(function(){  },100);
    try {
      if(this.fragment) {
       // console.log(this.fragment);
        document.querySelector('#' + this.fragment).scrollIntoView({ block: 'center', behavior: 'smooth' });
     //  setTimeout(function(){  },3000);

      }
  } catch (e) { }



  }
  ngAfterViewInit(){

  }
@HostListener('window:scroll', ['$event']) // for window scroll events

onScroll(event) {
 this.fragment=''
}
  ngOnInit() {
    this.isLogged=this.cookie.get('login')
    this.title_ser.setTitle(this.title)
    this._main.get_news()
    .subscribe(data=>{
      //console.log(data)
      let res:any=data;
      this.news_data=res.data;
      if(res.status==200){
        this.loader=false;
      }
     // console.log('sad')
      this._rout.fragment.subscribe(fragment => {
        return  this.fragment = fragment;
       });

    },(err=>{
      //console.log(err)
      this.loader=true;
    }))
  }

  checkSignUp(isLogged){
    this.toastr.clear();
    // console.log(isLogged)
    if(isLogged ==='false'){
     this.router.navigate(['/register'])
 }
 else if(isLogged==='true'){
   //alert('true')
   this.toastr.success('You are already logged in' )
 }
  } // check end 

  onPageChange(page: number) {
    this.p = page;
    window.scrollTo(0, 0);
 }
}
