import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'carplates-pagination',
  templateUrl: './frontend-angular-shared-ui-pagination.component.html',
  styleUrls: ['./frontend-angular-shared-ui-pagination.component.scss'],
})
export class PaginationComponent {
  @Input() formGroup!: FormGroup;
  @Input() pageSizes!: number[];

  totalPagesArray!: number[];

  get totalPages(): number {
    return this.formGroup?.get('totalPages')?.value;
  }

  generatePages(totalPages: number) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
