import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/auth.service';
import { Product } from '../../models/Product';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    product: Product;
    category: string;
    id: number;
    selectedTab: string = 'description';
    reviews: Review[];
    previousUrl: string;

    constructor(private authService: AuthenticationService,
                private activateRoute: ActivatedRoute,
                private router: Router,
                private reviewService: ReviewService,
                private flashMessages: FlashMessagesService
    ) {}

    ngOnInit() {
      this.reviews = [];
      this.id = this.activateRoute.snapshot.params['id'];
      this.category = this.activateRoute.snapshot.params['category'];
      this.reviewService.getReviews(this.id).subscribe(data => this.reviews = data);
      this.product = new Product();
      this.product.picture = [];
      this.product = this.activateRoute.snapshot.data['product'];
    }

    goBack() {
      this.router.navigate(['catalog', this.category]);
    }

    addFavorite(product: Product) {
      this.authService.addFavorite(product).subscribe(data => {
        if (!data) {
          this.flashMessages.show('Товар успешно добавлен в Избранное', {classes: ['alert-success'], timeout: 3000});
        } else {
          this.flashMessages.show('Данный товар уже находится в списке Избранного', {classes: ['alert-danger'], timeout: 3000});
        }
      });
    }

    toggleTab(value: string) {
      this.selectedTab  = value;
    }

    onReviewSubmit(text: string) {
      const review = {
          user: JSON.parse(localStorage.getItem('user')).username,
          productId: this.id,
          text: text,
          date: new Date()
      };
      this.reviewService.addReview(review).subscribe(review => this.reviews.push(review));
    }

}
