import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  userdetails: any = {};

  constructor(private myservice: MyserviceService) {}

  changepassword() {
    var url = 'https://apifromashu.herokuapp.com/api/recoverpassword';
    this.myservice.changepassword(url, this.userdetails).subscribe({
      next: (response: any) => {
        console.log('response from signup api', response);
      },
      error: (error: any) => {
        console.log('Error from singnup api', error);
      },
    });
  }

  ngOnInit(): void {}
}
