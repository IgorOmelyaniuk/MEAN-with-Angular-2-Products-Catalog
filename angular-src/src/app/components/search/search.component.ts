import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    products: Product[];
    categories: any[];
    searchString: string;
    lastIndex: number;
    selectedCategory: string;
    emptySearch: boolean;
    isLast: boolean;
    showLoader: boolean;

    constructor(
        private searchService: SearchService,
        private router: Router
    ) {}

    ngOnInit() {
        this.products = [];
        this.searchService.getAllCategories().subscribe(data => this.categories = data);
    }

    searchProducts() {
        this.isLast = false;
        this.emptySearch = false;
        this.lastIndex = 0;
        if (this.searchString.length > 1) {
            this.showLoader = true;
            this.searchService.searchProducts(this.selectedCategory, this.searchString, this.lastIndex).subscribe(data => {
                this.products = data.products;
                this.lastIndex = data.lastIndex;
                this.emptySearch = !this.products.length ? true : false;
                if (data.products.length < 10) this.isLast = true;
                this.showLoader = false;
            });
        } else this.emptySearch = false;
    }

    loadMoreProducts() {
        this.showLoader = true;
        this.searchService.searchProducts(this.selectedCategory, this.searchString, this.lastIndex).subscribe(data => {
            this.products = this.products.concat(data.products);
            this.lastIndex = data.lastIndex;
            if (data.products.length < 10) this.isLast = true;
            this.showLoader = false;
        });
    }

    onSelectProduct(product: Product) {
        this.searchString = '';
        this.selectedCategory = '';
        this.products = [];
        this.router.navigate(
            ['catalog', product.category, product._id]
        );
    }

    onSelectCategory(value: any) {
        this.selectedCategory = value;
        this.searchString = '';
    }

}
