import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  title='Analytics Steps | About Us';
  emailstring='mailto:info@analyticssteps.com';
  constructor(private title_ser:Title ) { }

  ngOnInit() {
   
    this.title_ser.setTitle(this.title)
  
  }

}
