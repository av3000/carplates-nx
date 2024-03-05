import { Component, Input } from '@angular/core';

@Component({
  selector: 'carplates-menu-dropdown',
  templateUrl: './frontend-angular-shared-ui-menu-dropdown.component.html',
  styleUrls: ['./frontend-angular-shared-ui-menu-dropdown.component.scss'],
})
export class MenuDropdownComponent {
  @Input() options: { text: string; action: () => void }[] = [];
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(optionAction: () => void) {
    optionAction();
    this.isOpen = false;
  }
}
