import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReviewService } from '../../../services/review.service';
import { AuthenticationService } from '../../../services/auth.service';
import { Review } from '../../../models/review';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

    @Input() reviews: Review[];
    @Output() reviewSubmit = new EventEmitter();
    text: string;

    constructor(
        private reviewService: ReviewService,
        private authService: AuthenticationService
    ) {}

    addReview() {
        this.reviewSubmit.emit(this.text);
        this.text = '';
    }
}
