// TODO: add sort filters
// TODO: create (reusable) filters component and move filters logic there
// TODO: move pagination logic fully to shared/ui/pagination
// TODO: create (reuseable) table component

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, Subscription, debounceTime } from 'rxjs';

import { DynamicModalService } from '@frontend-angular/shared/ui/modal';
import { CarplateFacade } from '@frontend-angular/carplate/carplate-data-access';
import { Carplate, CarplateFilters } from '@shared/carplate/types';
import { FrontendAngularSharedUiDeleteModalComponent } from '@frontend-angular/shared/ui/delete-modal';
import { DEFAULT_PAGE } from '@shared/common/constants';

@Component({
  selector:
    'carplates-frontend-angular-carplate-carplate-feature-carplate-list',
  templateUrl:
    './frontend-angular-carplate-carplate-feature-carplate-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontendAngularCarplateCarplateFeatureCarplateListComponent
  implements OnInit, OnDestroy
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('modalView') deleteModal!: TemplateRef<any>;
  @ViewChild('modalView', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  pageSizes = [3, 6, 10];

  activeFilters: CarplateFilters = {
    page: DEFAULT_PAGE,
    size: this.pageSizes[0],
  };

  private subs$ = new Subscription();
  pagination$ = this.facade.pagination$;
  carplatesList$ = this.facade.carplatesList$;
  isLoading$ = this.facade.isLoading$;
  isLoaded$ = this.facade.isLoaded$;

  carplateListFiltersForm = this.formBuilder.group({
    size: [this.pageSizes[0]],
    page: [DEFAULT_PAGE],
    totalPages: [DEFAULT_PAGE],
    count: [0],
    plate_name: [''],
    owner: [''],
    createdAt: [''],
    updatedAt: [''],
  });

  get itemsPerPageControl(): FormControl {
    return this.carplateListFiltersForm.get('size') as FormControl;
  }

  get currentPageControl(): FormControl {
    return this.carplateListFiltersForm.get('page') as FormControl;
  }

  get plateNameControl(): FormControl {
    return this.carplateListFiltersForm.get('plate_name') as FormControl;
  }

  get ownerControl(): FormControl {
    return this.carplateListFiltersForm.get('owner') as FormControl;
  }

  get createdAtControl(): FormControl {
    return this.carplateListFiltersForm.get('createdAt') as FormControl;
  }

  get updatedAtControl(): FormControl {
    return this.carplateListFiltersForm.get('updatedAt') as FormControl;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facade: CarplateFacade,
    private formBuilder: FormBuilder,
    private dynamicModalService: DynamicModalService
  ) {}

  ngOnInit() {
    this.initPaginationChangedListener();
    this.initUrlFilters();
    this.initPlateNameListener();
    this.initOwnerControlListener();
  }

  initPaginationChangedListener() {
    this.subs$.add(
      this.pagination$.subscribe((pagination) => {
        this.refreshUrl({
          page: pagination.currentPage,
          size: pagination.perPage,
        });
        this.carplateListFiltersForm.patchValue(
          {
            page: pagination.currentPage,
            size: pagination.perPage,
          },
          { emitEvent: false }
        );
      })
    );
  }

  initUrlFilters() {
    this.activeFilters = {
      ...this.activeFilters,
      ...this.route.snapshot.queryParams,
    };

    this.fetchInstances();

    this.carplateListFiltersForm.patchValue(
      {
        ...this.route.snapshot.queryParams,
      },
      { emitEvent: false }
    );
  }

  initPlateNameListener() {
    this.subs$.add(
      this.plateNameControl.valueChanges
        .pipe(debounceTime(500))
        .subscribe((plateName) => {
          this.activeFilters = {
            ...this.activeFilters,
            plate_name: plateName,
          };
          this.fetchInstances();
        })
    );
  }

  initOwnerControlListener() {
    this.subs$.add(
      this.ownerControl.valueChanges
        .pipe(debounceTime(500))
        .subscribe((owner) => {
          this.activeFilters = {
            ...this.activeFilters,
            owner: owner,
          };
          this.fetchInstances();
        })
    );
  }

  openDeleteCarplateModal(carplate: Carplate) {
    const configData = {
      instanceId: carplate.id,
      instanceName: carplate.plate_name,
      instanceOwner: carplate.owner,
      instanceType: 'carplate',
      onDelete: () => this.deleteCarplate(carplate.id),
    };

    this.dynamicModalService.open(FrontendAngularSharedUiDeleteModalComponent, {
      configData,
    });
  }

  deleteCarplate(id: string) {
    this.facade.deleteCarplate(id);
  }

  applyFilters(filters: CarplateFilters) {
    this.activeFilters = {
      ...this.activeFilters,
      ...filters,
    };
    this.fetchInstances();
  }

  fetchInstances() {
    this.facade.fetchAllCarplates(this.activeFilters);
    this.refreshUrl(this.activeFilters);
  }

  refreshUrl(queryParams: CarplateFilters) {
    this.router.navigate([], {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }
}
