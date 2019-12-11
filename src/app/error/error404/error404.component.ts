import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {
  title='Analytics Steps | 404 Error ';
  constructor(private title_ser:Title) { }

  ngOnInit() {
    this.title_ser.setTitle(this.title)
  }

}
