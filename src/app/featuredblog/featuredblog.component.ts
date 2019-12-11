import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../service/main-service.service';

@Component({
  selector: 'app-featuredblog',
  templateUrl: './featuredblog.component.html',
  styleUrls: ['./featuredblog.component.css']
})
export class FeaturedblogComponent implements OnInit {
latest_blog:any;
blog_list=[]
media_url:any;
loader:boolean=true;
  constructor(private _main:MainServiceService) {

   }
 
  ngOnInit() {
    
    this._main.getFeatured_blog()
    .subscribe(
    resp=>{
    
       let get_resp:any=resp;
       // console.log(get_resp)
       
       if(get_resp.status==200){
        this.loader=false;
        this.media_url=this._main.getMedia_url();
       }
       this.latest_blog=get_resp.data[0];
      
         this.blog_list= get_resp.data;
         this.blog_list.splice(0,1)
       // console.log(this.blog_list)
        
        
      },(err)=>{
       // console.log(err)
      }
    )
  }

}
