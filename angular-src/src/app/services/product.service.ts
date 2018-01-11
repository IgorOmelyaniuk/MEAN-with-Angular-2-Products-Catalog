import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Product } from '../models/Product';
import { Http } from '@angular/http';

@Injectable()
export class ProductService {

    constructor( private http: Http) {}

    getNewProducts(): Observable<Product[]> {
        return this.http.get('/products').map(resp => resp.json());
    }

    getProducts(category: string): Observable<Product[]> {
        return this.http.get('/products/' + category)
                        .map(resp => resp.json());
    }

    getProduct(category: string, id: number): Observable<Product> {
        return this.http.get('/products/:category/' + id)
                        .map(resp => resp.json());
    }

}
