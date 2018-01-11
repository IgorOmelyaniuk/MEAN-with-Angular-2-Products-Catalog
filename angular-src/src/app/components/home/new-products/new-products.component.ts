import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { Router} from '@angular/router';

@Component({
  selector: 'new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css']
})
export class NewProductsComponent implements OnInit {

    products: Product[];

    constructor(private productService: ProductService, private router: Router) {}

    ngOnInit() {
      this.productService.getNewProducts().subscribe(data => this.products = data);
    }

    onSelectProduct(product: Product) {
      this.router.navigate(
        ['catalog', product.category, product._id]
      );
    }

}