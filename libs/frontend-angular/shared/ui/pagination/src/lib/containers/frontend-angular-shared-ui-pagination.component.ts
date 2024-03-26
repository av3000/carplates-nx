import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Pagination } from '@shared/common/types';
import { DEFAULT_PAGE } from '@shared/common/constants';

@Component({
  selector: 'carplates-pagination',
  templateUrl: './frontend-angular-shared-ui-pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() formGroup!: FormGroup;
  @Input() pagination!: Pagination | null;
  @Input() pageSizes!: number[];
  @Output() upsertPagination = new EventEmitter<void>();

  private subs$ = new Subscription();

  get totalPages(): number {
    return this.pagination?.totalPages || 1;
  }

  get totalCount(): number | undefined {
    return this.pagination?.count;
  }

  get itemsPerPageControl(): FormControl {
    return this.formGroup.get('size') as FormControl;
  }

  get currentPageControl(): FormControl {
    return this.formGroup.get('page') as FormControl;
  }

  get currentPage(): number {
    return this.currentPageControl.value;
  }

  get totalPagesArray(): number[] {
    return Array.from(
      { length: this.totalPages ?? DEFAULT_PAGE },
      (_, i) => i + 1
    );
  }

  ngOnInit() {
    this.initCurrentPageControlListener();
    this.initItemsPerPageListener();
  }

  emmitUpsertPagination(filters: any) {
    this.upsertPagination.emit(filters);
  }

  initCurrentPageControlListener() {
    this.subs$.add(
      this.currentPageControl.valueChanges.subscribe((currentPage) => {
        this.emmitUpsertPagination({
          page: currentPage,
          size: this.itemsPerPageControl.value,
        });
      })
    );
  }

  initItemsPerPageListener() {
    this.subs$.add(
      this.itemsPerPageControl.valueChanges.subscribe((itemsPerPage) => {
        this.currentPageControl.reset(DEFAULT_PAGE, { emitEvent: false });

        this.emmitUpsertPagination({
          page: DEFAULT_PAGE,
          size: itemsPerPage,
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
