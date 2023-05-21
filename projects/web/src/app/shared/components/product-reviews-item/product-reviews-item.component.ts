import { Component, Input } from '@angular/core';

import { GetCurrentProductReviewsPHPInterface } from '../../../core/models/getCurrentProductReviewsPHP.interface';

@Component({
  selector: 'app-product-reviews-item',
  templateUrl: './product-reviews-item.component.html',
  styleUrls: ['./product-reviews-item.component.scss']
})
export class ProductReviewsItemComponent {

  @Input() productReview : GetCurrentProductReviewsPHPInterface = {} as GetCurrentProductReviewsPHPInterface;

}
