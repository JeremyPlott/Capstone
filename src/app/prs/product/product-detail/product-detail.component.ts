import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.class';
import { Vendor } from '../../vendor/vendor.class';
import { VendorService } from '../../vendor/vendor.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  vendors: Vendor[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsvc: ProductService,
    private vendorsvc: VendorService
  ) { }

  ngOnInit() {
    let productid = this.route.snapshot.params.id;
    this.productsvc.get(productid).subscribe(
      product => {
        this.product = product;
        console.log("Product:", product);
      },
      err => { console.error(err); }
    );
    this.vendorsvc.list().subscribe(
      vendors => {
        this.vendors = vendors;
        console.log("Vendors", vendors);
      }, 
      err => {
        console.error(err);
      }
    );
  }

}
