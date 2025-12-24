import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';

import { CategoriesComponent } from './pages/categories/categories.component';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';
import { CategoryCardComponent } from './components/category-card/category-card.component';

@NgModule({
    declarations: [CategoriesComponent, CategoryCardComponent],
    imports: [CommonModule, CategoriesRoutingModule, CoreModule, SharedModule],
})
export class CategoriesModule {}
