import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuDropdownComponent } from './containers/frontend-angular-shared-ui-menu-dropdown.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MenuDropdownComponent],
  exports: [MenuDropdownComponent],
})
export class FrontendAngularSharedUiMenuDropdownModule {}
