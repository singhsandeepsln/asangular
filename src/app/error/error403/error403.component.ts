import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.css']
})
export class Error403Component implements OnInit {
  title='Analytics Steps | 403 Error ';
  constructor(private title_ser:Title) { }

  ngOnInit() {this.title_ser.setTitle(this.title)
  }

}
