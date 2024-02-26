// TODO: create a separate effect for fetching all carplates before list component load
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { CarplateFacade } from '@frontend-angular/carplate/carplate-data-access';

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
  carplatesList$ = this.facade.carplates$;

  constructor(private facade: CarplateFacade) {}

  ngOnInit() {
    this.subs$.add(this.facade.fetchAllCarplates());
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }
}
