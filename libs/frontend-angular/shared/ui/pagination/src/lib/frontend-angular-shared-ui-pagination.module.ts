import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaginationComponent } from './containers/frontend-angular-shared-ui-pagination.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
})
export class FrontendAngularSharedUiPaginationModule {}
