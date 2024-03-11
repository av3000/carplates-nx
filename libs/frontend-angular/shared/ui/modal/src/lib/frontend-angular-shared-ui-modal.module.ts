import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendAngularSharedUiModalComponent } from './containers/frontend-angular-shared-ui-modal.component';
import { DynamicModalService } from './frontend-angular-share-ui-modal.service';

@NgModule({
  imports: [CommonModule],
  declarations: [FrontendAngularSharedUiModalComponent],
  exports: [FrontendAngularSharedUiModalComponent],
  providers: [DynamicModalService],
})
export class FrontendAngularSharedUiModalModule {}
