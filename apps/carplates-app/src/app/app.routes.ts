import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@frontend-angular/carplate/carplate-feature-carplate-list').then(
        (m) => m.CarplateFeatureCarplateListModule
      ),
  },
];
