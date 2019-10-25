import { Request } from '../request/request.class';
import { Product } from '../product/product.class';

export class RequestLine {

    id: number = 0;
    requestId: number;
    productId: number;
    quantity: number = 1;

    request: Request;
    product: Product;

    constructor(){}
}