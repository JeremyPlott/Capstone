import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { RequestLineService } from '../../requestlines/requestline.service';
import { RequestLine } from '../../requestlines/requestline.class';
import { SystemService } from '../../../core/system/system.service';
import { Product } from '../../product/product.class';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})

export class RequestDetailComponent implements OnInit {

  request: Request;
  requestlines: RequestLine[] = [];
  requestline: RequestLine;
  product: Product;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestsvc: RequestService,
    private requestlinesvc: RequestLineService,
    private systemsvc: SystemService,
    private productsvc: ProductService
  ) { }

  goRlCreate(request: Request) {
    this.router.navigateByUrl(`/requestlines/create/${request.id}`)
  }

  addLine(request: Request) {
    this.requestline = new RequestLine();
    this.requestline.requestId = request.id;
    this.requestlinesvc.create(this.requestline).subscribe(
      res => { console.log("Response from requestline create", res);
      this.refresh();
    },
      err => { console.log(err); }
    );
  }

  refresh(): void {
    let requestid = this.route.snapshot.params.id;
    this.requestsvc.get(requestid).subscribe(
      request => {
        this.request = request;
      },
      err => { console.error(err); }
    );
  }
  
  updateline(requestline: RequestLine): void {
    this.requestlinesvc.change(requestline).subscribe(
      res => { console.log("Response from requestline edit", res);
      this.refresh();
      // this.router.navigateByUrl(`/requests/detail/${parentReq}`) 
    },
      err => { console.log(err); }
    );
  }
  
  deleteline(requestline: RequestLine): void {
    this.requestlinesvc.remove(requestline).subscribe(
      res => { console.log("Response from requestline delete", res);
      this.refresh();
    },
    err => { console.log(err); }
    );
  }

  save(): void {
    this.requestsvc.change(this.request).subscribe(
      res => { console.log("Response from request save", res);
      this.router.navigateByUrl('/requests/list') 
    },
      err => { console.log(err); }
    );
  }

  ngOnInit() {
    this.systemsvc.CheckLogin();
    let requestid = this.route.snapshot.params.id;
    this.requestsvc.get(requestid).subscribe(
      request => {
        this.request = request;
        console.log("Request:", request);
      },
      err => { console.error(err); }
    );
    this.productsvc.list().subscribe(
      products => {
        this.products = products;
        console.log("Products", products);
      }, 
      err => {
        console.error(err);
      }
    );

    // this.router.routeReuseStrategy.shouldReuseRoute = function(){
    //   return false;
    // };
    // this.router.events.subscribe((evt) => {
    //   if (evt instanceof NavigationEnd) {
    //       this.router.navigated = false;
    //       window.scrollTo(0, 0);
    //   }
    // });
      
  }

}
