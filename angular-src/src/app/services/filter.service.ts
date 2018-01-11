import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Filter } from '../models/Filter';
import { Product } from '../models/product';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FilterService {

    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {}

    getFilter(category: string): Observable<Filter> {
        return this.http.get('/filter/' + category).map(resp => resp.json());
    }

    filterProducts(category: string, filter: Filter): Observable<Product[]> {
        return this.http.post('/filter/' + category + '/filter-products', {filter , headers: this.headers})
                        .map(resp => resp.json());
    }
}
