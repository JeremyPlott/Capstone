import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.class';
import { VendorService } from '../../vendor/vendor.service';
import { Vendor } from '../../vendor/vendor.class';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = new Product();
  vendors: Vendor[] = [];

  constructor(
    private router: Router,
    private productsvc: ProductService,
    private vendorsvc: VendorService,
  ) { }

  save(): void {
    this.productsvc.create(this.product).subscribe(
      res => { console.log("Response from product create", res);
      this.router.navigateByUrl('/products/list') 
    },
      err => { console.log(err); }
    );
  }

  ngOnInit() {
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
