import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.scss']
})
export class ProductRatingComponent {

  // Propiedades - Product Rading - Number of Reviews
  @Input() productCardRatingShowNumberOfReviews :boolean = false;


}
