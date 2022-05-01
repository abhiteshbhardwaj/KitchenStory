import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private ngxService: NgxUiLoaderService) {}

  ngOnInit(): void {
    this.ngxService.start();

    setTimeout(() => {
      this.ngxService.stop();
    }, 1500);

    this.ngxService.startBackground('do-background-things');
    this.ngxService.stopBackground('do-background-things');
    this.ngxService.startLoader('loader-01');

    setTimeout(() => {
      this.ngxService.stopLoader('loader-01');
    }, 3000);
  }
}
