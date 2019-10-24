import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.class';
import { Vendor } from '../../vendor/vendor.class';
import { VendorService } from '../../vendor/vendor.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  vendors: Vendor[] = [];
  sortCriteria: string = "name";
  sortOrder: string = "asc";
  searchCriteria: string = "";

  sortBy(prop: string): void {
    if(prop === this.sortCriteria) {
      this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    }
    this.sortCriteria = prop;
  }

  constructor(
    private productsvc: ProductService,
    private vendorsvc: VendorService
  ) { }

  ngOnInit() {
    this.productsvc.list().subscribe(
      products => {
        this.products = products;
        console.log("Products", products);
      }, 
      err => {
        console.error(err);
      }
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
