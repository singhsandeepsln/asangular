import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/service/main-service.service';
import swal from 'sweetalert2'
import { HeaderService } from 'src/app/service/header.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  subscribe:FormGroup;
  show_icon=false;
  footer_hide_div:boolean=false;
  loader:boolean=false;
  constructor(private toastr:ToastrService, private header_service:HeaderService,private router:Router, private fb:FormBuilder, private _main:MainServiceService) {
      this.header_service.footer_hide_div.subscribe(data=>{
        this.footer_hide_div=data;
      })
   }

  ngOnInit() {
    this.subscribe=this.fb.group({
      email:['',[Validators.required, Validators.email]]
    })
  }
  IsValid(){
    if((this.router.url !='/login')&&(this.router.url !='/register')&&(this.router.url !='/change-password')&&(this.router.url !='/forget-password')&&(this.router.url !='/reset-password')){ return true; }
    return false;
  }

 

  onSubmit(){
    this.toastr.clear();
    this.loader=true;
    //console.log(this.subscribe.value)
    //this.subscribe.reset
    this._main.newsLetterSubscribe(this.subscribe.value)
    .subscribe(
      (data)=>{
      // console.log(data)
        let subcribed_data:any=data;
        if(subcribed_data.status==201){
          //  debugger
          this.loader=false;
          this.toastr.success(subcribed_data.message);
          // swal.fire({
          //   title:subcribed_data.message,
          //   type:'success'
          // })
          this.subscribe.reset();
        }
        if(subcribed_data.status==200){
          this.subscribe.reset();
          this.loader=false;
          this.toastr.success(subcribed_data.message);
        }
        if(subcribed_data.status==400){        
          this.loader=false;
          this.toastr.error(subcribed_data.message);
        }
      },(err)=>{
        this.toastr.error(err.error.message);
        this.loader=false;
        //console.log(err)
      }
    )
  }

  show_scroller(){
    //console.log('fdsdf')
     window.scrollTo(0, 0)
     
   }


}
