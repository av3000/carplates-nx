import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription, debounceTime, filter, switchMap, take } from 'rxjs';

import { DynamicModalService } from '@frontend-angular/shared/ui/modal';
import { CarplateFacade } from '@frontend-angular/carplate/carplate-data-access';
import { Carplate, CarplateFilters } from '@shared/carplate/types';
import { FrontendAngularSharedUiDeleteModalComponent } from '@frontend-angular/shared/ui/delete-modal';
import { PaginatedList } from '@shared/common/types';

@Component({
  selector:
    'carplates-frontend-angular-carplate-carplate-feature-carplate-list',
  templateUrl:
    './frontend-angular-carplate-carplate-feature-carplate-list.component.html',
})
export class FrontendAngularCarplateCarplateFeatureCarplateListComponent
  implements OnInit, OnDestroy
{
  @ViewChild('modalView') deleteModal!: TemplateRef<any>;
  @ViewChild('modalView', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  private subs$ = new Subscription();
  carplatesList$ = this.facade.carplatesList$;
  isLoading$ = this.facade.isLoading$;
  isLoaded$ = this.facade.isLoaded$;
  carplateListFiltersForm = this.formBuilder.group({
    perPage: [0],
    currentPage: [0],
    totalPages: [0],
    count: [0],
    plate_name: [''],
    owner: [''],
    createdAt: [''],
    updatedAt: [''],
  });

  pageSizes = [3, 6, 10];

  get itemsPerPageControl(): FormControl {
    return this.carplateListFiltersForm.get('perPage') as FormControl;
  }

  get currentPageControl(): FormControl {
    return this.carplateListFiltersForm.get('currentPage') as FormControl;
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
    private facade: CarplateFacade,
    private formBuilder: FormBuilder,
    private dynamicModalService: DynamicModalService
  ) {}

  ngOnInit() {
    this.facade.fetchAllCarplates({} as CarplateFilters);
    this.initListeners();
  }

  initListeners() {
    this.subs$.add(
      this.isLoaded$
        .pipe(
          filter((isLoaded) => isLoaded),
          take(1),
          switchMap(() => this.carplatesList$)
        )
        .subscribe((carplatesList) => {
          this.initPaginationFilterValues(carplatesList);
          this.initCurrentPageControlListener();
          this.initItemsPerPageListener();
          this.initPlateNameListener();
          this.initOwnerControlListener();
        })
    );
  }

  initPaginationFilterValues(carplatesList: PaginatedList<Carplate>) {
    this.carplateListFiltersForm = this.formBuilder.group({
      perPage: [carplatesList.perPage],
      currentPage: [carplatesList.currentPage],
      totalPages: [carplatesList.totalPages],
      count: [carplatesList.count],
      plate_name: [''],
      owner: [''],
      createdAt: [''],
      updatedAt: [''],
    });
  }

  initCurrentPageControlListener() {
    this.subs$.add(
      this.currentPageControl.valueChanges.subscribe((currentPage) => {
        this.router.navigate([], {
          queryParams: {
            page: currentPage,
            size: this.itemsPerPageControl.value,
          },
          queryParamsHandling: 'merge',
        });
        this.facade.fetchAllCarplates({
          page: currentPage,
          size: this.itemsPerPageControl.value,
          plate_name: this.plateNameControl.value,
          owner: this.ownerControl.value,
        });
      })
    );
  }

  initItemsPerPageListener() {
    this.subs$.add(
      this.itemsPerPageControl.valueChanges.subscribe((itemsPerPage) => {
        this.router.navigate([], {
          queryParams: {
            page: 0,
            size: itemsPerPage,
          },
          queryParamsHandling: 'merge',
        });

        this.facade.fetchAllCarplates({
          page: 0,
          size: itemsPerPage,
          plate_name: this.plateNameControl.value,
          owner: this.ownerControl.value,
        });
      })
    );
  }

  initPlateNameListener() {
    this.subs$.add(
      this.plateNameControl.valueChanges
        .pipe(debounceTime(500))
        .subscribe((plateName) => {
          this.facade.fetchAllCarplates({
            plate_name: plateName,
            owner: this.ownerControl.value,
            page: this.currentPageControl.value,
            size: this.itemsPerPageControl.value,
          });
        })
    );
  }

  initOwnerControlListener() {
    this.subs$.add(
      this.ownerControl.valueChanges
        .pipe(debounceTime(500))
        .subscribe((owner) => {
          this.facade.fetchAllCarplates({
            owner: owner,
            page: this.currentPageControl.value,
            size: this.itemsPerPageControl.value,
            plate_name: this.plateNameControl.value,
          });
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

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }
}
