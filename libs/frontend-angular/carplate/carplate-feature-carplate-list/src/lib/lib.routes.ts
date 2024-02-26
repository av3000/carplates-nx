import { Route } from '@angular/router';

import { FrontendAngularCarplateCarplateFeatureCarplateListComponent } from './containers/frontend-angular-carplate-carplate-feature-carplate-list.component';

export const CarplateFeatureCarplateListRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: FrontendAngularCarplateCarplateFeatureCarplateListComponent,
  },
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  // {
  //   path: 'carplate/:id',
  //   loadChildren: () =>
  //     import('@frontend-angular/carplates-feature-carplate-details').then(
  //       (m) => m.CarplatesFeatureCarplateDetailsModule
  //     ),
  // },
  // {
  //   path: 'add-carplate',
  //   loadChildren: () =>
  //     import('@frontend-angular/carplates-feature-carplate-add').then(
  //       (m) => m.CarplatesFeatureCarplateAddModule
  //     ),
  // }
];
