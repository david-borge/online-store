import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoryComponent } from './pages/category/category.component';

@NgModule({
    declarations: [CategoryComponent, CategoryDetailComponent],
    imports: [CategoryRoutingModule, CommonModule, CoreModule, SharedModule],
})
export class CategoryModule {}
