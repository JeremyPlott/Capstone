import { Vendor } from '../vendor/vendor.class';
import { CurrencyPipe } from '@angular/common';

export class Product {

    id: number = 0;
    partNbr: string;
    name: string;
    price: number;
    unit: string;
    photoPath: string;
    vendorId: string;
    vendor: Vendor;

    constructor(){}
}