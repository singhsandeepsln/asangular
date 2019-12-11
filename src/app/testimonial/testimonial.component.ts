import { Component, OnInit, HostListener } from '@angular/core';
import { MainServiceService } from '../service/main-service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
final_data=[];
media_url:any;
selectedItem
isGradientVisible:boolean=false;
loader:boolean=false;
constructor(private _main:MainServiceService) {this.media_url=this._main.getMedia_url();}
  


  ngOnInit() {
    this.loader=true;
    this._main.getTestimonial()
    .subscribe(
      (resp)=>{
        //console.log(resp)
        let test_data:any=resp;
        this.final_data=test_data.data
        if(test_data.status==200){
        //  debugger
          this.loader=false
        }
        
      //  console.log(this.final_data)
      }
    )
  } // ng oni t

  listClick(event, newValue) {
 //   console.log(event)
 //   console.log(newValue);
    this.selectedItem = newValue;  // don't forget to update the model here
    // ... do other stuff here ...
}


showTestimonial(id){
  // console.log(id)
  $('.test_li').removeClass('selected');
  $('.'+id).addClass('selected').siblings('.test_li').removeClass('selected');

 
  $('.testimonial_content').css("display", "none");
  $('#'+id).css("display", "block");

}

// start crausel slider
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  navSpeed: 700,
  margin: 18,
  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
  responsive: {
    0: { items: 1 },
    400: { items: 1 },
    740: { items: 3 },
    940: { items: 4 }
  },
  nav: false,
  autoplay:false,
 
} // end slider 




}
