import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd,NavigationStart } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations'; 
import { Subscription } from 'rxjs';
import { PlatformLocation } from '@angular/common';
export let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[ 
    trigger('fade',
    [ 
      state('void', style({ opacity : 0})),
      transition(':enter',[ animate(300)]),
      transition(':leave',[ animate(500)]),
    ]
)
]
  
})
export class AppComponent implements OnInit{
  constructor(private router:Router, location: PlatformLocation){
    
    location.onPopState(() => {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 300);

  });


    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
        //console.log(browserRefresh)
        if(browserRefresh==true){
         
          setTimeout(() => {
          window.scrollTo(0, 0)
          }, 300);
        
      }
      }
  });
  }
  windowScrolled: boolean;
  subscription: Subscription;
  ngOnInit(){
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
   
      window.scrollTo(0, 0)
  });

  

  }

  



  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {

     /* ---------------------- sroll  on show bottom to top ------------------------ */

     if (window.pageYOffset >100) {
       let element = document.getElementById('navbar');
       let element1 = document.getElementById('fixed_height_header');
       element.classList.add('sticky_header');
       element1.classList.add('fixed_height_header_100');
     } else {
        let element = document.getElementById('navbar');
        let element1 = document.getElementById('fixed_height_header');
        element.classList.remove('sticky_header'); 
        element1.classList.remove('fixed_height_header_100');

     }



     /* ---------------------- sroll  on show bottom to top ------------------------ */
     if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
      } 
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }

  } // end scroll
 
 scrollToTop(el: HTMLElement) {
    // (function smoothscroll() {
    //     var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    //     if (currentScroll > 0) {
    //         window.requestAnimationFrame(smoothscroll);
    //         window.scrollTo(0, currentScroll - (currentScroll / 8));
    //     }
    // })();

    el.scrollIntoView({ behavior: "smooth", block: "start" });
} // end 

}
