import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendAngularSharedUiModalModule } from '@frontend-angular/shared/ui/modal';

import { FrontendAngularSharedUiDeleteModalComponent } from './containers/frontend-angular-shared-ui-delete-modal.component';

@NgModule({
  imports: [CommonModule, FrontendAngularSharedUiModalModule],
  declarations: [FrontendAngularSharedUiDeleteModalComponent],
  exports: [FrontendAngularSharedUiDeleteModalComponent],
})
export class FrontendAngularSharedUiDeleteModalModule {}
