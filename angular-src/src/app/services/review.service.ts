import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Review } from '../models/Review';
import 'rxjs/add/operator/map';
import { Headers, Http } from '@angular/http';

@Injectable()
export class ReviewService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getReviews(id): Observable<Review[]> {
        return this.http.get('/reviews/' + id).map(resp => resp.json());
    }

    addReview(review) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('reviews/add', review, {headers: headers})
            .map(resp => resp.json());
    }
}