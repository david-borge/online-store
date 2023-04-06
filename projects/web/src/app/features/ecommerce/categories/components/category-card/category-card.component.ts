import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryInterface } from 'projects/web/src/app/core/models/category.interface';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {

  @Input() category = {} as CategoryInterface;

  constructor(
    public router: Router,
  ) { }

}
