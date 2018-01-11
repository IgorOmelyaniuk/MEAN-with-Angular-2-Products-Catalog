import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Category } from "app/models/category";
import { Section } from "app/models/section";
import { Group } from "app/models/group";

@Injectable()
export class MenuService {

    constructor( private http: Http) {}

    getSections(): Observable<Section[]>{
        return this.http.get('/menu')
                    .map(resp => resp.json());
    }

    getGroups(section: string): Observable<Group[]>{
        return this.http.get('/menu/' + section)
                    .map(resp => resp.json());
    }

    getCategories(section: string, group: string): Observable<Category[]> {
        return this.http.get('/menu/:section/' + group)
                    .map(resp => resp.json());
    }

}
