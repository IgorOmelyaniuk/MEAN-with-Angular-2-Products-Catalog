import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Product } from '../models/Product';

@Injectable()
export class SearchService {

    constructor(private http: Http) {}

    getAllCategories() {
        return this.http.get('/search').map(resp => resp.json());
    }

    searchProducts(category: string, searchString: string, lastIndex: number) {
        return this.http.get('/search/' + category + '/' + searchString + '/' + lastIndex).map(resp => resp.json());
    }

}
