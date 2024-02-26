import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'carplates',
    loadChildren: () =>
      import('@frontend-angular/carplate/carplate-feature-carplate-list').then(
        (m) => m.CarplateFeatureCarplateListModule
      ),
  },
];
