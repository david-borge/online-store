import { Component, Input } from '@angular/core';

import { ProductInterface } from '../../../core/models/product.interface';

@Component({
    standalone: false,
    selector: 'app-featured-products-carrousel',
    templateUrl: './featured-products-carrousel.component.html',
    styleUrls: ['./featured-products-carrousel.component.scss'],
})
export class FeaturedProductsCarrouselComponent {
    // TODO:
    @Input() featuredProductsList: ProductInterface[] = [];
}
