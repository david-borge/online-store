import { Component, Input } from '@angular/core';

import { GetReviewsPHPInterface } from '../../../core/models/getReviewsPHP.interface';

@Component({
  selector: 'app-product-reviews-item',
  templateUrl: './product-reviews-item.component.html',
  styleUrls: ['./product-reviews-item.component.scss']
})
export class ProductReviewsItemComponent {

  @Input() productReview : GetReviewsPHPInterface = {} as GetReviewsPHPInterface;

}
