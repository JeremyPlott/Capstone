import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor.class';
import { SystemService } from '../../../core/system/system.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {

  vendor: Vendor;
  verifyDelete: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vendorsvc: VendorService,
    private systemsvc: SystemService
    ) { }

  save(): void {
    this.vendorsvc.change(this.vendor).subscribe(
      res => { console.log("Response from vendor edit", res);
      this.router.navigateByUrl('/vendors/list') 
    },
      err => { console.log(err); }
    );
  }
  edit(): void {
    this.router.navigateByUrl(`/vendors/edit/${this.vendor.id}`);
  }
  verify(): void {
    this.verifyDelete = !this.verifyDelete;
  }
  delete(): void {
    this.vendorsvc.remove(this.vendor).subscribe(
      res => { console.log("Response from vendor edit", res);
      this.router.navigateByUrl('/vendors/list') 
    },
      err => { console.log(err); }
    );
  }

  ngOnInit() {
    this.systemsvc.CheckLogin();
    let vendorid = this.route.snapshot.params.id;
    this.vendorsvc.get(vendorid).subscribe(
      vendor => {
        this.vendor = vendor;
        console.log("Vendor:", vendor);
      },
    );
  }

}
