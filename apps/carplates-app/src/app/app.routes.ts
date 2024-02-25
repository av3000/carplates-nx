import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@frontend-angular/carplate/carplates-feature-carplate-list').then(
        (m) => m.CarplateFeatureCarplateListModule
      ),
  },
];
