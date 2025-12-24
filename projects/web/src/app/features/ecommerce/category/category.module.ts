import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CoreModule } from '../../../core/core.module';

import { CategoryComponent } from './pages/category/category.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [CategoryComponent, CategoryDetailComponent],
    imports: [CommonModule, CategoryRoutingModule, CoreModule, SharedModule],
})
export class CategoryModule {}
