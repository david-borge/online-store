import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
  host: {
    class:'app-category-detail-classes-for-router-outlet'
  },
})
export class CategoryDetailComponent {

  /* constructor (
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    // Recupero el Route Parameter con el nombre de la categoría que quiero mostrar en este componente
    const routeParameterCategoryName :string =  this.route.snapshot.params['category-name'];

    // Comprobacion
    console.log("CategoryDetailComponent - routeParameterCategoryName: " + routeParameterCategoryName);

  } */

}
