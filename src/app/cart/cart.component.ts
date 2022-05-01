import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartitems: any = [];
  totalPrice: any = 0;
  faMinus = faMinus;
  faPlus = faPlus;
  faTrash = faTrash;

  constructor(
    private mainservice: MyserviceService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {
    var url = 'https://apifromashu.herokuapp.com/api/cakecart';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {};
    this.mainservice.getCartItems(url, body, options).subscribe({
      next: (response: any) => {
        console.log('Response from cart items api', response);
        this.cartitems = response.data;
        this.cartitems.forEach((each: any) => {
          this.totalPrice = this.totalPrice + each.price * each.quantity;
        });
      },
      error: (error) => {
        console.log('Error from cart items api', error);
      },
    });
  }

  checkout() {
    let cartDetails: any = {
      cartitems: this.cartitems,
      totalPrice: this.totalPrice,
    };
    this.mainservice.getCartDataFromCartComponent(cartDetails);
  }
  addToCart(index: any) {
    if (localStorage['token']) {
      let myheaders = new HttpHeaders();
      myheaders = myheaders.append('authtoken', localStorage['token']);
      var url = 'https://apifromashu.herokuapp.com/api/addcaketocart';

      var options = {
        headers: myheaders,
      };
      console.log('PRICE', this.cartitems[index].name);
      var body = {
        cakeid: this.cartitems[index].cakeid,
        name: this.cartitems[index].name,
        weight: this.cartitems[index].weight,
        price: this.cartitems[index].price,
        image: this.cartitems[index].image,
      };
      this.mainservice.addCakeToCart(url, body, options).subscribe({
        next: (response: any) => {
          console.log('response from add to cart api', response);
          if (response.data) {
            this.cartitems[index].quantity += 1;
            this.router.navigate(['/cart']);
          }
        },
        error: (error) => {
          console.log('Error from add to cart api', error);
        },
      });
      this.updatetotalprice();
    } else {
      this.router.navigate(['/login']);
    }
  }

  updatetotalprice() {
    this.totalPrice = 0;
    for (const iterator of this.cartitems) {
      this.totalPrice += iterator.price * iterator.quantity;
    }
  }

  removeOneCakefromCart(index: any) {
    var url = 'https://apifromashu.herokuapp.com/api/removeonecakefromcart';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {
      cakeid: this.cartitems[index].cakeid,
    };

    this.updatetotalprice();
  }

  removeCakefromCart(index: any) {
    var url = 'https://apifromashu.herokuapp.com/api/removecakefromcart';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {
      cakeid: this.cartitems[index].cakeid,
    };
    this.mainservice.removeCakeFromCart(url, body, options).subscribe({
      next: (response: any) => {
        console.log('Response from remove cake api', response);

        this.router.navigate(['/cart']).then(() => {
          window.location.reload();
        });
      },
      error: (error: any) => {
        console.log('Error from remove cake api', error);
      },
    });
    this.updatetotalprice();
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
