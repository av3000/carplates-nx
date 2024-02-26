import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import { Carplate } from '@shared/carplate/types';
import { CarplateService } from '@frontend-angular/carplate/carplate-data-access';
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
  private subs$ = new Subscription();
  carplates$ = new BehaviorSubject<PaginatedList<Carplate>>({
    count: 0,
    totalPages: 0,
    currentPage: 0,
    rows: [],
  });

  constructor(private carplateService: CarplateService) {}

  ngOnInit() {
    this.subs$.add(
      this.carplateService.getCarplatesList().subscribe((_carplates) => {
        console.log('carplates', _carplates);
        this.carplates$.next(_carplates);
      })
    );
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }
}
