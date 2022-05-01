import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  userdetails: any;
  totalprice: any;
  cakes: any;
  orderdetails: any = {};

  constructor(private myservice: MyserviceService, private http: HttpClient) {
    let cartDetails = this.myservice.sendCartDetails();

    this.userdetails = this.myservice.sendUserDetails();

    this.totalprice = cartDetails.totalPrice;
    this.cakes = cartDetails.cartitems;

    console.log('CART DETAILS', this.cakes);
  }

  placeorder() {
    var url = 'https://apifromashu.herokuapp.com/api/addcakeorder';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {
      cakes: this.cakes,
      price: this.totalprice,
      name: this.userdetails.name,
      address: this.userdetails.address,
      city: this.userdetails.city,
      pincode: this.userdetails.pincode,
      phone: this.userdetails.phone,
    };
    this.myservice.placeOrder(url, body, options).subscribe({
      next: (response: any) => {
        console.log('Response from add cake order api', response);
        this.orderdetails = response.order;
      },
      error: (error: any) => {
        console.log('Error from place order api', error);
      },
    });
  }

  ngOnInit(): void {}
}
