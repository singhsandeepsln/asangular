import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-error500',
  templateUrl: './error500.component.html',
  styleUrls: ['./error500.component.css']
})
export class Error500Component implements OnInit {
  title='Analytics Steps | 500 Error ';
  constructor(private title_ser:Title) { }

  ngOnInit() {
    this.title_ser.setTitle(this.title)
  }

}
