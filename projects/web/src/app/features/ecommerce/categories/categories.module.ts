import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoriesComponent } from './pages/categories/categories.component';

@NgModule({
    declarations: [CategoriesComponent, CategoryCardComponent],
    imports: [CategoriesRoutingModule, CommonModule, CoreModule, SharedModule],
})
export class CategoriesModule {}
