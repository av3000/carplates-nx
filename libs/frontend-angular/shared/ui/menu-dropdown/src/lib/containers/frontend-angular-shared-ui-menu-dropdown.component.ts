import { Component } from '@angular/core';

@Component({
  selector: 'carplates-menu-dropdown',
  templateUrl: './frontend-angular-shared-ui-menu-dropdown.component.html',
  styleUrls: ['./frontend-angular-shared-ui-menu-dropdown.component.scss'],
})
export class MenuDropdownComponent {
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }
}
