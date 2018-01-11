import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolver implements Resolve<Product> {
    constructor(private productService: ProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        const category = route.params['category'],
        id = +route.params['id'],
        product = this.productService.getProduct(category, id);
        return product;
    }
}
