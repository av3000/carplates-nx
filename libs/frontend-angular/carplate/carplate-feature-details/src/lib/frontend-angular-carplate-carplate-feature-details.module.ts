import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FrontendAngularSharedUiModalModule } from '@frontend-angular/shared/ui/modal';
import { FrontendAngularCarplateCarplateDataAccessModule } from '@frontend-angular/carplate/carplate-data-access';
import { FrontendAngularSharedUiBackendErrorModule } from '@frontend-angular/shared/ui/backend-error';

import { FrontendAngularCarplateCarplateFeatureDetailsComponent } from './containers/frontend-angular-carplate-carplate-feature-details.component';

const routes: Routes = [
  {
    path: '',
    component: FrontendAngularCarplateCarplateFeatureDetailsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FrontendAngularSharedUiBackendErrorModule,
    FrontendAngularSharedUiModalModule,
    FrontendAngularCarplateCarplateDataAccessModule,

    RouterModule.forChild(routes),
  ],
  declarations: [FrontendAngularCarplateCarplateFeatureDetailsComponent],
  exports: [FrontendAngularCarplateCarplateFeatureDetailsComponent],
})
export class FrontendAngularCarplateCarplateFeatureDetailsModule {}
