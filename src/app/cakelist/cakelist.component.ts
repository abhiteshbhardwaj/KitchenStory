import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cakelist',
  templateUrl: './cakelist.component.html',
  styleUrls: ['./cakelist.component.css'],
})
export class CakelistComponent implements OnInit {
  constructor(private myangular: MyserviceService, private http: HttpClient) {
    var url = 'https://apifromashu.herokuapp.com/api/allcakes';
    this.http.get(url).subscribe({
      next: (Response: any) => {
        this.cakes = Response.data;
      },
      error: (Error) => {
        console.log('Error from cakesAPI', Error);
      },
    });
  }

  ascSort() {
    this.cakes = this.myangular.ascending(this.cakes);
  }

  descSort() {
    this.cakes = this.myangular.descending(this.cakes);
  }

  cakes: any = [];

  ngOnInit(): void {}
}
