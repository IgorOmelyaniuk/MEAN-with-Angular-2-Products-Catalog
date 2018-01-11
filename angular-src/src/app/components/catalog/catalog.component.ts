import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FilterService } from '../../services/filter.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { Filter } from '../../models/filter';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

    products: Product[] = [];
    category: string;
    filter: Filter;
    savedFilter: Filter;
    saveProducts: Product[];
    typeSorting: string;
    showLoader: boolean;

    constructor(
      private productService: ProductService,
      private activateRoute: ActivatedRoute,
      private filterService: FilterService
    ) {}

    ngOnInit() {
      this.category = this.activateRoute.snapshot.params['category'];
      this.savedFilter = JSON.parse(localStorage.getItem('savedFilter'));

      if (this.savedFilter) {
        this.filter = this.savedFilter;
        this.showLoader = true;
        this.filterService.filterProducts(this.category, this.filter).subscribe(data => {
          this.defaultSorting(data);
        });
      } else {
        this.filter = new Filter();
        this.filterService.getFilter(this.category).subscribe(data => this.filter = data);
        this.showLoader = true;
        this.productService.getProducts(this.category).subscribe(data => {
          this.defaultSorting(data);
        });
      }
    }

    onChangedFilter(filter: Filter) {
      this.showLoader = true;
      localStorage.removeItem('savedFilter');
      localStorage.setItem('savedFilter', JSON.stringify(this.filter));
      this.filterService.filterProducts(this.category, filter).subscribe(data => {
        this.defaultSorting(data);
        let list = document.getElementsByClassName('products-list');
        list[0].scrollIntoView();
      });
    }

    onPriceDown() {
      this.products.sort((a, b) => (+a.price > +b.price ) ? -1 : (+a.price < +b.price) ? 1 : 0);
    }

    onPriceUp() {
      this.products.sort((a, b) => (+a.price < +b.price ) ? -1 : (+a.price > +b.price) ? 1 : 0);
    }

    defaultSorting(data) {
      this.products = data;
      if (localStorage.getItem('typeSorting') === 'down') {
        this.onPriceDown();
      } else if (localStorage.getItem('typeSorting') === 'up') {
        this.onPriceUp();
      }
      this.showLoader = false;
    }

}
