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

@Component({
  selector: 'carplates-pagination',
  templateUrl: './frontend-angular-shared-ui-pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() formGroup!: FormGroup;
  @Input() pagination!: Pagination | null;
  @Input() pageSizes!: number[];
  @Output() fetchInstances = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<void>();

  private subs$ = new Subscription();

  get totalPages(): number {
    return this.pagination?.totalPages || 1;
  }

  get totalCount(): number | undefined {
    return this.pagination?.count;
  }

  get itemsPerPageControl(): FormControl {
    return this.formGroup.get('perPage') as FormControl;
  }

  get currentPageControl(): FormControl {
    return this.formGroup.get('currentPage') as FormControl;
  }

  get currentPage(): number {
    return this.currentPageControl.value;
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages ?? 1 }, (_, i) => i + 1);
  }

  ngOnInit() {
    this.initCurrentPageControlListener();
    this.initItemsPerPageListener();
  }

  emmitFetchInstances(filters: any) {
    this.fetchInstances.emit(filters);
  }

  emmitNavigate(queryParams: any) {
    this.navigate.emit(queryParams);
  }

  initCurrentPageControlListener() {
    this.subs$.add(
      this.currentPageControl.valueChanges.subscribe((currentPage) => {
        this.emmitNavigate({
          page: currentPage,
          size: this.itemsPerPageControl.value,
        });

        this.emmitFetchInstances({
          page: currentPage,
          size: this.itemsPerPageControl.value,
        });
      })
    );
  }

  initItemsPerPageListener() {
    this.subs$.add(
      this.itemsPerPageControl.valueChanges.subscribe((itemsPerPage) => {
        this.currentPageControl.reset(1, { emitEvent: false });

        this.emmitNavigate({
          page: 1,
          size: itemsPerPage,
        });

        this.emmitFetchInstances({
          page: 1,
          size: itemsPerPage,
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
