// TODO: create a separate effect for fetching all carplates before list component load
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { Subscription, debounceTime } from 'rxjs';

import { CarplateFacade } from '@frontend-angular/carplate/carplate-data-access';
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '@shared/common/constants';

@Component({
  selector:
    'carplates-frontend-angular-carplate-carplate-feature-carplate-list',
  templateUrl:
    './frontend-angular-carplate-carplate-feature-carplate-list.component.html',
})
export class FrontendAngularCarplateCarplateFeatureCarplateListComponent
  implements OnInit, OnDestroy
{
  private subs$ = new Subscription();
  carplatesList$ = this.facade.carplatesList$;
  isLoading$ = this.facade.isLoading$;
  isLoaded$ = this.facade.isLoaded$;
  carplateListFiltersForm = this.formBuilder.group({
    itemsPerPage: [DEFAULT_ITEMS_PER_PAGE],
    page: [DEFAULT_PAGE],
    plate_name: [''],
    owner: [''],
    createdAt: [''],
    updatedAt: [''],
  });

  pageSizes = [3, 6, 10];

  get itemsPerPageControl(): FormControl {
    return this.carplateListFiltersForm.get('itemsPerPage') as FormControl;
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
    private facade: CarplateFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    //TODO: refactor to use separate single effect for fetching.
    this.facade.fetchAllCarplates();

    this.initCurrentPageControlListener();
    this.initItemsPerPageListener();
    this.initPlateNameListener();
    this.initOwnerControlListener();
  }

  viewDetails() {
    // Navigate to the details route
    console.log('View details clicked');
  }

  deleteCarplate(id: string) {
    // Code to delete goes here
    console.log('Delete carplate clicked');
  }

  initCurrentPageControlListener() {
    this.subs$.add(
      this.currentPageControl.valueChanges.subscribe((currentPage) => {
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
        this.facade.fetchAllCarplates({
          page: this.currentPageControl.value,
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

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }
}
