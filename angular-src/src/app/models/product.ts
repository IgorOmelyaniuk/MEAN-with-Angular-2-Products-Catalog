import { Param } from './Param';

export interface IProduct {
    _id: string;
    price: string;
    category: string;
    picture: Array<any>;
    name: string;
    vendor: string;
    description: string;
    country_of_origin: string;
    wieght: string;
    param: Array<Param>;
}

export class Product implements IProduct {
    public _id: string;
    public price: string;
    public category: string;
    public picture: Array<any>;
    public name: string;
    public vendor: string;
    public description: string;
    public country_of_origin: string;
    public wieght: string;
    public param: Array<Param>;
}