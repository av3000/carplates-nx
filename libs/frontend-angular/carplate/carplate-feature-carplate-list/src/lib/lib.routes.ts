import { Route } from '@angular/router';

import { FrontendAngularCarplateCarplateFeatureCarplateListComponent } from './containers/frontend-angular-carplate-carplate-feature-carplate-list.component';

export const CarplateFeatureCarplateListRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: FrontendAngularCarplateCarplateFeatureCarplateListComponent,
  },
  {
    path: 'carplates',
    component: FrontendAngularCarplateCarplateFeatureCarplateListComponent,
    children: [
      {
        path: ':id',
        loadChildren: () =>
          import('@frontend-angular/carplate/carplate-feature-details').then(
            (m) => m.FrontendAngularCarplateCarplateFeatureDetailsModule
          ),
      },
      {
        path: 'new',
        loadChildren: () =>
          import('@frontend-angular/carplate/carplate-feature-details').then(
            (m) => m.FrontendAngularCarplateCarplateFeatureDetailsModule
          ),
      },
    ],
  },
];
