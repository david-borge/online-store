import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  host: {
    class:'app-categories-classes-for-router-outlet'
  },
})
export class CategoriesComponent {

  constructor(
    public router: Router,
  ) {}

}
