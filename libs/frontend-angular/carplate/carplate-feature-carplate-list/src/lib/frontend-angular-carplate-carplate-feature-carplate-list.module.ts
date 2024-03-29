import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FrontendAngularCarplateCarplateDataAccessModule } from '@frontend-angular/carplate/carplate-data-access';
import { FrontendAngularSharedUiPaginationModule } from '@frontend-angular/shared/ui/pagination';
import { FrontendAngularSharedUiDeleteModalModule } from '@frontend-angular/shared/ui/delete-modal';
import { FrontendAngularSharedUiMenuDropdownModule } from '@frontend-angular/shared/ui/menu-dropdown';

import { CarplateFeatureCarplateListRoutes } from './lib.routes';
import { FrontendAngularCarplateCarplateFeatureCarplateListComponent } from './containers/frontend-angular-carplate-carplate-feature-carplate-list.component';

@NgModule({
  declarations: [FrontendAngularCarplateCarplateFeatureCarplateListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FrontendAngularSharedUiDeleteModalModule,
    FrontendAngularSharedUiMenuDropdownModule,
    FrontendAngularSharedUiPaginationModule,
    FrontendAngularCarplateCarplateDataAccessModule,
    RouterModule.forChild(CarplateFeatureCarplateListRoutes),
  ],
})
export class CarplateFeatureCarplateListModule {}
