import { Component , Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit  {

    @Input() showLoader: boolean;
    @Input() products: Product[];
    @Input() category: string;
    @Output() priceDown = new EventEmitter();
    @Output() priceUp = new EventEmitter();
    curPage: number;
    typeSorting: string;

    constructor(private router: Router) {}

    ngOnInit() {
        this.curPage = +localStorage.getItem('currentPage') || 1;
    }

    onSelectProduct(product: Product, page: number) {
        if (page !== undefined) {
            this.curPage = page;
            localStorage.setItem('currentPage', JSON.stringify(this.curPage));
        }
        this.router.navigate(['catalog', this.category, product._id]);
    }

    sortPriceUp() {
        this.typeSorting = 'up';
        localStorage.setItem('typeSorting', this.typeSorting);
        this.priceUp.emit();
    }

    sortPriceDown() {
        this.typeSorting = 'down';
        localStorage.setItem('typeSorting', this.typeSorting);
        this.priceDown.emit();
    }

}
