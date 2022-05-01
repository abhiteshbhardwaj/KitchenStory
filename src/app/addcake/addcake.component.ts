import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { faCake, faUpload } from '@fortawesome/free-solid-svg-icons';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-addcake',
  templateUrl: './addcake.component.html',
  styleUrls: ['./addcake.component.css'],
})
export class AddcakeComponent implements OnInit {
  file: any;
  imageUrl: any = {};
  cake: any = {};
  info: any;
  options: any;
  myegg: boolean = true;
  ingre: any = [];
  price: number = 0;
  faCake = faCake;
  faUpload = faUpload;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService
  ) {}
  getFile(event: any) {
    this.file = event.target.files[0];
  }
  upload() {
    // hit the api
    var url = 'https://apifromashu.herokuapp.com/api/upload';
    var formdata = new FormData();
    formdata.append('file', this.file);
    var myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    this.http.post(url, formdata, options).subscribe({
      next: (response: any) => {
        console.log('Response from image upload api', response);
        this.imageUrl = response.imageUrl;
        this.toastr.success('Image Has Uploaded');
      },
      error: (error) => {
        console.log('Error from image upload api', error);
      },
    });
  }
  submit() {
    if (this.cake.eggless == 'true') {
      this.myegg = true;
    } else {
      this.myegg = false;
    }
    this.ingre[0] = this.cake.ingredients;
    this.price = this.cake.price;
    var url = 'https://apifromashu.herokuapp.com/api/addcake';
    this.info = {
      name: this.cake.name,
      price: this.cake.price,
      description: this.cake.description,
      ingredients: this.ingre,
      image: this.imageUrl,
      type: this.cake.type,
      weight: this.cake.weight,
      eggless: this.myegg,
    };
    let myheader = new HttpHeaders();
    myheader = myheader.append('authtoken', localStorage['token']);
    this.options = {
      headers: myheader,
    };
    this.http.post(url, this.info, this.options).subscribe({
      next: (response: any) => {
        console.log('Response from api', response);
        this.router.navigate(['']);
        this.toastr.success('Cake Added Successfully!');
      },
      error: (error: any) => {
        console.log('Error from api', error);
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
