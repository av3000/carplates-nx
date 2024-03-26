import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DynamicModalService } from '@frontend-angular/shared/ui/modal';

@Component({
  selector: 'carplates-frontend-angular-shared-ui-delete-modal',
  templateUrl: './frontend-angular-shared-ui-delete-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontendAngularSharedUiDeleteModalComponent {
  constructor(private dynamicModalService: DynamicModalService) {}

  get instanceId() {
    return this.dynamicModalService.options?.configData?.instanceId;
  }

  get instanceName() {
    return this.dynamicModalService.options?.configData?.instanceName;
  }

  get instanceType() {
    return this.dynamicModalService.options?.configData?.instanceType;
  }

  get instanceOwner() {
    return this.dynamicModalService.options?.configData?.instanceOwner;
  }

  emitDeletion() {
    this.dynamicModalService.options?.configData?.onDelete();
    this.close();
  }

  close() {
    this.dynamicModalService.close();
  }
}
