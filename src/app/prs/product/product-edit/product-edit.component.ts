import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.class';
import { Vendor } from '../../vendor/vendor.class';
import { VendorService } from '../../vendor/vendor.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product;
  verifyDelete: boolean = true;
  vendors: Vendor[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsvc: ProductService,
    private vendorsvc: VendorService
    ) { }

  save(): void {
    this.productsvc.change(this.product).subscribe(
      res => { console.log("Response from product edit", res);
      this.router.navigateByUrl('/products/list') 
    },
      err => { console.log(err); }
    );
  }
  edit(): void {
    this.router.navigateByUrl(`/products/edit/${this.product.id}`);
  }
  verify(): void {
    this.verifyDelete = !this.verifyDelete;
  }
  delete(): void {
    this.productsvc.remove(this.product).subscribe(
      res => { console.log("Response from product edit", res);
      this.router.navigateByUrl('/products/list') 
    },
      err => { console.log(err); }
    );
  }

  ngOnInit() {
    let productid = this.route.snapshot.params.id;
    this.productsvc.get(productid).subscribe(
      product => {
        this.product = product;
        console.log("Product:", product);
      },
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