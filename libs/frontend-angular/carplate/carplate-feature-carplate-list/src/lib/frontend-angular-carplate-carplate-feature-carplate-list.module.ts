import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CarplateFeatureCarplateListRoutes } from './lib.routes';
import { FrontendAngularCarplateCarplateFeatureCarplateListComponent } from './containers/frontend-angular-carplate-carplate-feature-carplate-list.component';

@NgModule({
  declarations: [FrontendAngularCarplateCarplateFeatureCarplateListComponent],
  imports: [
    CommonModule,

    RouterModule.forChild(CarplateFeatureCarplateListRoutes),
  ],
})
export class CarplateFeatureCarplateListModule {}
