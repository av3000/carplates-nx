import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ErrorResponse } from '@shared/common/types';

@Component({
  selector: 'carplates-frontend-angular-shared-ui-backend-error',
  templateUrl: './frontend-angular-shared-ui-backend-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontendAngularSharedUiBackendErrorComponent {
  @Input() error!: ErrorResponse | null;
}
