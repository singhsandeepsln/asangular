import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-use',
  templateUrl: './terms-use.component.html',
  styleUrls: ['./terms-use.component.css']
})
export class TermsUseComponent implements OnInit {

  title='Analytics Steps | Terms of Use';
  constructor(private title_ser:Title) { }

  ngOnInit() {
    this.title_ser.setTitle(this.title)
  }

}
