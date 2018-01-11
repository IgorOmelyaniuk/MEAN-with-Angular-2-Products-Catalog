import { Component , OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

    currentUser: User;
    products: Product[] = [];

    constructor(private authService: AuthenticationService,
                private router: Router)
    {}

    ngOnInit() {
      this.authService.getProfile().subscribe(profile => {
        this.currentUser = profile.user;
        this.products = profile.user.favorites;
      },
      err => {
        return false;
      });
    }

    onSelectProduct(product: Product) {
      this.router.navigate(
        ['catalog', product.category, product._id]
      );
    }

    removeFavorite(product: Product) {
      this.authService.removeFavorite(product).subscribe(data => this.products = data);
    }

}
