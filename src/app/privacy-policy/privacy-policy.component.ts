import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  title='Analytics Steps | Privacy Policy';
  emailstring='mailto:info@analyticssteps.com'
  constructor(private title_ser:Title) { }

  ngOnInit() {
    this.title_ser.setTitle(this.title)
  }

}
