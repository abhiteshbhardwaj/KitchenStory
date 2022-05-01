import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
})
export class MyordersComponent implements OnInit {
  myorders: any = [];
  constructor(
    private myservice: MyserviceService,
    private http: HttpClient,
    private ngxService: NgxUiLoaderService
  ) {
    var url = 'https://apifromashu.herokuapp.com/api/cakeorders';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {};
    this.myservice.getmyorders(url, body, options).subscribe({
      next: (response: any) => {
        console.log('Response from add my orders api', response);
        this.myorders = response.cakeorders;
        console.log('MY ORDERS', this.myorders);
      },
      error: (error: any) => {
        console.log('Error from my orders api', error);
      },
    });
  }

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
