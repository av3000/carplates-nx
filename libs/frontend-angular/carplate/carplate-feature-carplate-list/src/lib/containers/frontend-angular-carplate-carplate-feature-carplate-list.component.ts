// TODO: after display items per page and current page changes, the url should be updated as well
// And vice versa, if the url is updated, the display items per page and current page should be updated as well
// for ex: table display=6 and after create, update or delete, the refresh sets back to 3
// TODO: add timestamp filters
// TODO: add sort filters

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
import { Router } from '@angular/router';

import { Subscription, debounceTime } from 'rxjs';

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
  @ViewChild('modalView') deleteModal!: TemplateRef<any>;
  @ViewChild('modalView', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  pageSizes = [3, 6, 10];

  private subs$ = new Subscription();
  pagination$ = this.facade.pagination$;
  carplatesList$ = this.facade.carplatesList$;
  isLoading$ = this.facade.isLoading$;
  isLoaded$ = this.facade.isLoaded$;

  carplateListFiltersForm = this.formBuilder.group({
    perPage: [this.pageSizes[0]],
    currentPage: [DEFAULT_PAGE],
    totalPages: [DEFAULT_PAGE],
    count: [0],
    plate_name: [''],
    owner: [''],
    createdAt: [''],
    updatedAt: [''],
  });

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
    this.initPlateNameListener();
    this.initOwnerControlListener();
  }

  initPlateNameListener() {
    this.subs$.add(
      this.plateNameControl.valueChanges
        .pipe(debounceTime(500))
        .subscribe((plateName) => {
          this.facade.fetchAllCarplates({
            plate_name: plateName,
            owner: this.ownerControl.value,
            page: DEFAULT_PAGE,
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
            page: DEFAULT_PAGE,
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

  fetchInstances(filters: any) {
    this.facade.fetchAllCarplates(filters);
  }

  navigate(queryParams: any) {
    this.router.navigate([], {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }
}
