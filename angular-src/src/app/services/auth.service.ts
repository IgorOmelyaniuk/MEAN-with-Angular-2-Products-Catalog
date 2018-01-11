import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../models/User';
import { Product } from '../models/Product';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {

    authToken: any;
    user: User;

    constructor(private http: Http) {}

    registerUser(user) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/register', user, {headers: headers})
            .map(resp => resp.json());
    }

    authenticateUser(user) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/authenticate', user, {headers: headers})
            .map(resp => resp.json());
    }

    getProfile() {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('users/profile', {headers: headers})
            .map(resp => resp.json());
    }

    storeUserData(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }
    
    loadToken() {
        const token = localStorage.getItem('token');
        this.authToken = token;
    }

    loggedIn() {
        return tokenNotExpired('token');
    }

    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }

    addFavorite(product: Product) {
        if (this.user === undefined && localStorage.getItem('token'))
            this.user = JSON.parse(localStorage.getItem('user'));
       
        let headers = new Headers();
        let query: any = {
            product: Product,
            user: User
        };
        query.product = product;
        query.user = this.user;
        headers.append('Content-Type', 'application/json');
        return this.http.put('users/addFavorite', query, {headers: headers})
            .map(resp => resp.json());
    }

    removeFavorite(product: Product) {
        if (this.user === undefined && localStorage.getItem('token'))
            this.user = JSON.parse(localStorage.getItem('user'));

        let headers = new Headers();
        let query: any = {
            product: Product,
            user: User
        };
        query.product = product;
        query.user = this.user;
        headers.append('Content-Type', 'application/json');
        return this.http.put('users/removeFavorite', query, {headers: headers})
            .map(resp => resp.json());
    }

}
