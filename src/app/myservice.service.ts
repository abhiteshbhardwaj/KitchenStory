import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyserviceService {
  PORT = 8080;

  signup(url: any, body: any) {
    return this.http.post(url, body);
  }

  login(url: any, body: any) {
    return this.http.post(url, body);
  }

  ascending(data: any) {
    data.sort((obj1: any, obj2: any) => {
      return obj1.price - obj2.price;
    });
    return data;
  }

  descending(data: any) {
    data.sort((obj1: any, obj2: any) => {
      return obj2.price - obj1.price;
    });
    return data;
  }

  cartitems: any;
  price: any;
  userdetails: any;
  cartDetails: any = {};
  userCheckoutDetails: any = {};

  searchCakes(url: any) {
    return this.http.get(url);
  }

  getCakedetails(url: any) {
    return this.http.get(url);
  }

  addCakeToCart(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  getCartItems(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  removeCakeFromCart(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  uploadImage(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  placeOrder(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  getmyorders(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  getCartDataFromCartComponent(cartDetails: any) {
    this.cartDetails = cartDetails;
  }

  getUserDataFromAddressComponent(userdata: any) {
    this.userCheckoutDetails = userdata;
  }

  sendCartDetails() {
    console.log('CART DETAILS SERVICE', this.cartDetails);
    return this.cartDetails;
  }

  sendUserDetails() {
    return this.userCheckoutDetails;
  }

  changepassword(url: any, data: any) {
    return this.http.post(url, data);
  }

  constructor(private http: HttpClient) {}
}
