import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  host: {
    class:'app-category-classes-for-router-outlet'
  },
})
export class CategoryComponent {

  getCurrentCategory() {
    
  }

}
