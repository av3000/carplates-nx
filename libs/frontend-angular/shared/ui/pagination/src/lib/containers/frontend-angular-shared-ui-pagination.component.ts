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
  @Input() count!: number;
  @Input() totalPages!: number;
  @Input() currentPage!: number;

  totalPagesArray!: number[];

  generatePages(totalPages: number) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }
}
