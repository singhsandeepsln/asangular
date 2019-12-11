import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../service/main-service.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
left_news_data:any=[];
left_data:any=[];
right_data:any=[];
media_url:any;
loader:boolean=true;
chcek_url;
  constructor(private _main:MainServiceService) {
    this.media_url=this._main.getMedia_url();
   }

  ngOnInit() {
    this._main.getNews()
    .subscribe((data)=>{
   //  console.log(data)
      let news_data:any=data;
      this.left_news_data=news_data.data;
     
      if(news_data.status==200){
        this.loader=false;
        this.chcek_url=this._main.getMedia_url();

      }
     // console.log(this.left_news_data)
     for(let keys in this.left_news_data){
      // console.log(keys)
     }
     for(let keys=0; keys<=4; keys++){
      // console.log(keys)
       //console.log(this.left_news_data[keys])
       this.left_data[keys]=this.left_news_data[keys]
      // console.log(this.left_data)
      
       
     }
     for(let keys=5; keys<=10; keys++){
      // console.log(keys)
       this.right_data[keys]=this.left_news_data[keys];
    //  console.log(this.right_data)
      
     }
     this.right_data.splice(0,5)
    })
   // console.log(this.right_data)
  
  }

}
