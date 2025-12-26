import { Component, Input } from '@angular/core';

import { ReviewInterface } from '../../../core/models/review.interface';

@Component({
    standalone: false,
    selector: 'app-product-rating',
    templateUrl: './product-rating.component.html',
    styleUrls: ['./product-rating.component.scss'],
})
export class ProductRatingComponent {
    // Propiedades - Product Rading - Number of Reviews
    @Input() productCardRatingShowNumberOfReviews = false;
    @Input() productCardRatingNumber: ReviewInterface['ratingNumber'] = 0;
    @Input() productCardRatingNumberOfReviews = 0;
}
